import {
  BorderedRadio,
  Button,
  Flex,
  RadioGroup,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Respond_order } from "__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "__generated__/RespondCounterOfferMutation.graphql"
import { Helper } from "Apps/Order/Components/Helper"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ShowErrorModal } from "Apps/Order/ErrorModalContext"
import { wrapOrderAppPage } from "Apps/Order/OrderApp"
import { Mediator } from "Artsy/SystemContext"
import { StaticCollapse } from "Components/StaticCollapse"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../../Components/OfferHistoryItem"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "../../Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"

export interface RespondProps {
  order: Respond_order
  mediator: Mediator
  relay?: RelayProp
  router: Router
  showErrorModal: ShowErrorModal
}

export interface RespondState {
  offerValue: number
  formIsDirty: boolean
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE"
  isCommittingMutation: boolean
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

export class RespondRoute extends Component<RespondProps, RespondState> {
  state: RespondState = {
    offerValue: 0,
    formIsDirty: false,
    responseOption: null,
    isCommittingMutation: false,
  }

  onContinueButtonPressed: () => void = () => {
    if (this.state.responseOption === "COUNTER" && this.state.offerValue <= 0) {
      this.setState({ formIsDirty: true })
      return
    }

    const { responseOption } = this.state
    this.setState({ isCommittingMutation: true }, () => {
      switch (responseOption) {
        case "COUNTER":
          this.createCounterOffer(this.state.offerValue)
            .then(() => {
              this.props.router.push(
                `/orders/${this.props.order.id}/review/counter`
              )
            })
            .catch(this.onMutationError)
          break
        case "ACCEPT":
          this.props.router.push(`/orders/${this.props.order.id}/review/accept`)
          break
        case "DECLINE":
          this.props.router.push(
            `/orders/${this.props.order.id}/review/decline`
          )
          break
      }
    })
  }

  createCounterOffer(price: number) {
    return new Promise((resolve, reject) =>
      commitMutation<RespondCounterOfferMutation>(
        this.props.relay.environment,
        {
          mutation: graphql`
            mutation RespondCounterOfferMutation(
              $input: buyerCounterOfferInput!
            ) {
              ecommerceBuyerCounterOffer(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    order {
                      ...Respond_order
                    }
                  }
                  ... on OrderWithMutationFailure {
                    error {
                      type
                      code
                      data
                    }
                  }
                }
              }
            }
          `,
          variables: {
            input: {
              offerId: this.props.order.lastOffer.id,
              offerPrice: {
                amount: price,
                currencyCode: "USD",
              },
            },
          },
          onCompleted: result => {
            const orderOrError = result.ecommerceBuyerCounterOffer.orderOrError
            if (orderOrError.error) {
              reject(
                new ErrorWithMetadata(
                  orderOrError.error.code,
                  orderOrError.error
                )
              )
            } else {
              resolve(orderOrError.order)
            }
          },
          onError: reject,
        }
      )
    )
  }

  onMutationError = (errors, title?, message?) => {
    logger.error(errors)
    this.props.showErrorModal({ title, message })
  }

  inputRef = React.createRef<HTMLInputElement>()

  render() {
    const { order } = this.props
    const { isCommittingMutation } = this.state
    const artwork = get(
      this.props,
      props => order.lineItems.edges[0].node.artwork
    )

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Respond"
                steps={counterofferFlowSteps}
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
              >
                <Flex flexDirection="column">
                  <CountdownTimer
                    action="Respond"
                    note="Expired offers end the negotiation process permanently."
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <OfferHistoryItem order={order} />
                  <TransactionDetailsSummaryItem
                    order={order}
                    useLastSubmittedOffer
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <RadioGroup
                  onSelect={(responseOption: any) =>
                    this.setState({ responseOption })
                  }
                  defaultValue={this.state.responseOption}
                >
                  <BorderedRadio value="ACCEPT">
                    Accept seller's offer
                  </BorderedRadio>

                  <BorderedRadio value="COUNTER">
                    Send a counteroffer
                    <StaticCollapse
                      open={this.state.responseOption === "COUNTER"}
                    >
                      <Spacer mb={2} />
                      <OfferInput
                        id="RespondForm_RespondValue"
                        showError={
                          this.state.formIsDirty && this.state.offerValue <= 0
                        }
                        onChange={offerValue => this.setState({ offerValue })}
                      />
                    </StaticCollapse>
                  </BorderedRadio>
                  <BorderedRadio value="DECLINE">
                    Decline seller's offer
                    <StaticCollapse
                      open={this.state.responseOption === "DECLINE"}
                    >
                      <Spacer mb={1} />
                      <Sans size="2" color="black60">
                        Declining an offer permanently ends the negotiation
                        process. The seller will not be able to make a
                        counteroffer.
                      </Sans>
                    </StaticCollapse>
                  </BorderedRadio>
                </RadioGroup>
                <Spacer mb={3} />
                <Flex flexDirection="column" />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Continue
                  </Button>
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <ShippingSummaryItem order={order} locked />
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Helper artworkId={artwork.id} />
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
                    <Button
                      onClick={this.onContinueButtonPressed}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Continue
                    </Button>
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </>
    )
  }
}

export const RespondFragmentContainer = createFragmentContainer(
  wrapOrderAppPage(RespondRoute),
  graphql`
    fragment Respond_order on Order {
      id
      mode
      state
      itemsTotal(precision: 2)
      totalListPrice(precision: 2)
      stateExpiresAt
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ... on OfferOrder {
        lastOffer {
          createdAt
          id
        }
      }
      ...TransactionDetailsSummaryItem_order
      ...ArtworkSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      ...OfferHistoryItem_order
    }
  `
)
