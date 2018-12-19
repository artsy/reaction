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
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { Input } from "Components/Input"
import { ErrorModal } from "Components/Modal/ErrorModal"
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
}

export interface RespondState {
  offerValue: number | null
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE"
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalTitle: string
  errorModalMessage: string
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

interface OfferInputProps {
  id: string
  onChange: (value: number) => void
}

interface OfferInputState {
  offerValue: number | null
  formIsDirty: boolean
}

function isValueValid(value) {
  return typeof value === "number" && value > 0
}

class OfferInput extends Component<OfferInputProps, OfferInputState> {
  state = {
    offerValue: null,
    formIsDirty: false,
  }

  inputRef = React.createRef<HTMLInputElement>()

  isOfferValueValid() {
    const { offerValue } = this.state
    return isValueValid(offerValue)
  }

  render() {
    const { id } = this.props
    const { formIsDirty } = this.state

    return (
      <Input
        id={id}
        title="Your offer"
        // note - Offer/index uses type="number"; Respond/index uses type="text"/pattern="[0-9]".
        type="text"
        pattern="[0-9]"
        onBlur={() => {
          if (this.inputRef) {
            this.inputRef.current.value = Number(
              this.state.offerValue || "0"
            ).toFixed(2)
          }
        }}
        onKeyDown={ev => {
          const char = String.fromCharCode(ev.keyCode)
          console.log(char)
          if (char.match(/[.,\D]/)) {
            ev.preventDefault()
          }
        }}
        innerRef={this.inputRef}
        defaultValue={null}
        error={
          formIsDirty && !this.isOfferValueValid()
            ? "Offer amount missing or invalid."
            : null
        }
        onChange={ev => {
          const newValue = Math.floor(Number(ev.currentTarget.value || "0"))
          this.setState({
            offerValue: newValue,
          })
          this.props.onChange(newValue)
        }}
        block
      />
    )
  }
}

export class RespondRoute extends Component<RespondProps, RespondState> {
  state = {
    offerValue: null,
    responseOption: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
  } as RespondState

  isOfferValueValid() {
    const { offerValue } = this.state
    return isValueValid(offerValue)
  }

  onContinueButtonPressed: () => void = () => {
    if (!this.isOfferValueValid()) {
      // TODO - figure out how to do this with extracted OfferInput.
      // this.setState({ formIsDirty: true })
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

  onMutationError = (errors, errorModalTitle?, errorModalMessage?) => {
    logger.error(errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
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
                        onChange={value => {
                          this.setState({
                            offerValue: value,
                          })
                        }}
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

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="orders@artsy.net"
          detailText={this.state.errorModalMessage}
          headerText={this.state.errorModalTitle}
        />
      </>
    )
  }
}

const RespondRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <RespondRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const RespondFragmentContainer = createFragmentContainer(
  RespondRouteWrapper,
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
