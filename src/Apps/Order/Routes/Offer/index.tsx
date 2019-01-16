import { Button, Col, Flex, Message, Row, Sans, Spacer } from "@artsy/palette"
import { Offer_order } from "__generated__/Offer_order.graphql"
import { OfferMutation } from "__generated__/OfferMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { Helper } from "Apps/Order/Components/Helper"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { offerFlowSteps, OrderStepper } from "../../Components/OrderStepper"

export interface OfferProps {
  order: Offer_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

export interface OfferState {
  offerValue: number
  isCommittingMutation: boolean
  formIsDirty: boolean
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class OfferRoute extends Component<OfferProps, OfferState> {
  state: OfferState = {
    offerValue: 0,
    isCommittingMutation: false,
    formIsDirty: false,
    lowSpeedBumpEncountered: false,
    highSpeedBumpEncountered: false,
  }

  @track<OfferProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<OfferProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer may be too low",
      message:
        "Offers within 25% of the list price are most likely to receive a response.",
      continueButtonText: "OK",
    })
  }

  @track<OfferProps>(props => ({
    order_id: props.order.id,
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      title: "Offer higher than list price",
      message: "You’re making an offer higher than the list price.",
      continueButtonText: "OK",
    })
  }

  onContinueButtonPressed: () => void = async () => {
    const {
      offerValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    if (offerValue <= 0) {
      this.setState({ formIsDirty: true })
      return
    }

    const listPriceCents = this.props.order.totalListPriceCents

    if (!lowSpeedBumpEncountered && offerValue * 100 < listPriceCents * 0.75) {
      this.showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      this.state.offerValue * 100 > listPriceCents
    ) {
      this.showHighSpeedbump()
      return
    }

    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        commitMutation<OfferMutation>(this.props.relay.environment, {
          mutation: graphql`
            mutation OfferMutation($input: AddInitialOfferToOrderInput!) {
              ecommerceAddInitialOfferToOrder(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    __typename
                    order {
                      id
                      mode
                      totalListPrice
                      totalListPriceCents
                      ... on OfferOrder {
                        myLastOffer {
                          id
                          amountCents
                        }
                      }
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
              orderId: this.props.order.id,
              offerPrice: {
                amount: offerValue,
                currencyCode: "USD",
              },
            },
          },
          onCompleted: data => {
            this.setState({ isCommittingMutation: false })
            const {
              ecommerceAddInitialOfferToOrder: { orderOrError },
            } = data

            if (orderOrError.error) {
              switch (orderOrError.error.code) {
                case "invalid_amount_cents": {
                  this.onMutationError(
                    new ErrorWithMetadata(
                      orderOrError.error.code,
                      orderOrError.error
                    ),
                    "Invalid offer",
                    "The offer amount is either missing or invalid. Please try again."
                  )
                  break
                }

                default: {
                  this.onMutationError(
                    new ErrorWithMetadata(
                      orderOrError.error.code,
                      orderOrError.error
                    )
                  )
                  break
                }
              }
            } else {
              this.props.router.push(`/orders/${this.props.order.id}/shipping`)
            }
          },
          onError: this.onMutationError.bind(this),
        })
      }
    })
  }

  onMutationError(error, title?, message?) {
    logger.error(error)
    this.props.dialog.showErrorDialog({ title, message })
    this.setState({ isCommittingMutation: false })
  }

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
              <OrderStepper currentStep="Offer" steps={offerFlowSteps} />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
                id="offer-page-left-column"
              >
                <Flex flexDirection="column">
                  <OfferInput
                    id="OfferForm_offerValue"
                    showError={
                      this.state.formIsDirty && this.state.offerValue <= 0
                    }
                    onChange={offerValue => this.setState({ offerValue })}
                    onFocus={this.onOfferInputFocus.bind(this)}
                  />
                </Flex>
                {Boolean(order.totalListPrice) && (
                  <Sans size="2" color="black60">
                    List price: {order.totalListPrice}
                  </Sans>
                )}
                <Spacer mb={[2, 3]} />
                <Message p={[2, 3]}>
                  If your offer is accepted, your payment will be processed
                  immediately. Keep in mind making an offer doesn’t guarantee
                  you the work, as the seller might be receiving higher offers.
                </Message>
                <Spacer mb={[2, 3]} />
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
                  <TransactionDetailsSummaryItem
                    order={order}
                    offerOverride={
                      this.state.offerValue &&
                      this.state.offerValue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })
                    }
                  />
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
                    <Spacer mb={2} />
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

export const OfferFragmentContainer = createFragmentContainer(
  injectDialog(trackPageViewWrapper(OfferRoute)),
  graphql`
    fragment Offer_order on Order {
      id
      mode
      state
      totalListPrice(precision: 2)
      totalListPriceCents
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
    }
  `
)
