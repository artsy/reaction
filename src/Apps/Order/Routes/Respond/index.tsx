import {
  BorderedRadio,
  Button,
  Col,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Respond_order } from "__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "__generated__/RespondCounterOfferMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { StaticCollapse } from "Components/StaticCollapse"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { ErrorWithMetadata } from "Utils/errors"
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
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

export interface RespondState {
  offerValue: number
  formIsDirty: boolean
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE"
  isCommittingMutation: boolean
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

@track()
export class RespondRoute extends Component<RespondProps, RespondState> {
  state: RespondState = {
    offerValue: 0,
    responseOption: null,
    isCommittingMutation: false,
    formIsDirty: false,
    lowSpeedBumpEncountered: false,
    highSpeedBumpEncountered: false,
  }

  @track<RespondProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<RespondProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer may be too low",
      message:
        "Offers within 25% of the seller's offer are most likely to receive a response.",
      continueButtonText: "OK",
    })
  }

  @track<RespondProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer higher than seller's offer",
      message: "You’re making an offer higher than the seller's offer.",
      continueButtonText: "OK",
    })
  }

  onContinueButtonPressed = async () => {
    const {
      responseOption,
      offerValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    if (responseOption === "COUNTER") {
      if (offerValue <= 0) {
        this.setState({ formIsDirty: true })
        return
      }
      const currentOfferPrice = this.props.order.itemsTotalCents

      if (
        !lowSpeedBumpEncountered &&
        offerValue * 100 < currentOfferPrice * 0.75
      ) {
        this.showLowSpeedbump()
        return
      }

      if (
        !highSpeedBumpEncountered &&
        this.state.offerValue * 100 > currentOfferPrice
      ) {
        this.showHighSpeedbump()
        return
      }
    }

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
    this.props.dialog.showErrorDialog({ title, message })
    this.setState({ isCommittingMutation: false })
  }

  inputRef = React.createRef<HTMLInputElement>()

  render() {
    const { order } = this.props
    const { isCommittingMutation } = this.state

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
                    note="Expiration will end negotiations on this offer. Keep in mind the work can be sold to another buyer in the meantime."
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
                    Send counteroffer
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
                        onFocus={this.onOfferInputFocus.bind(this)}
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
                        Declining an offer will end the negotiation process on
                        this offer.
                      </Sans>
                    </StaticCollapse>
                  </BorderedRadio>
                </RadioGroup>
                <Spacer mb={[2, 3]} />
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
                <Spacer mb={2} />
                <Media at="xs">
                  <>
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
  injectDialog(trackPageViewWrapper(RespondRoute)),
  graphql`
    fragment Respond_order on Order {
      id
      mode
      state
      itemsTotal(precision: 2)
      itemsTotalCents
      totalListPrice(precision: 2)
      totalListPriceCents
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
