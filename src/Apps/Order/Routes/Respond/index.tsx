import {
  BorderedRadio,
  Button,
  Col,
  Collapse,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
  TextAreaChange,
} from "@artsy/palette"
import { Respond_order } from "__generated__/Respond_order.graphql"
import { RespondCounterOfferMutation } from "__generated__/RespondCounterOfferMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { OfferNote } from "Apps/Order/Components/OfferNote"
import { RevealButton } from "Apps/Order/Components/RevealButton"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
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
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface RespondState {
  offerValue: number
  offerNoteValue: TextAreaChange
  formIsDirty: boolean
  responseOption: "ACCEPT" | "COUNTER" | "DECLINE"
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
}

export const logger = createLogger("Order/Routes/Respond/index.tsx")

@track()
export class RespondRoute extends Component<RespondProps, RespondState> {
  state: RespondState = {
    offerValue: 0,
    offerNoteValue: { value: "", exceedsCharacterLimit: false },
    responseOption: null,
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
      offerNoteValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    if (responseOption === "ACCEPT") {
      this.props.router.push(`/orders/${this.props.order.id}/review/accept`)
      return
    }

    if (responseOption === "DECLINE") {
      this.props.router.push(`/orders/${this.props.order.id}/review/decline`)
      return
    }

    // responseOption === "COUNTER"

    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
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

    try {
      const {
        ecommerceBuyerCounterOffer: { orderOrError },
      } = await this.createCounterOffer({
        input: {
          offerId: this.props.order.lastOffer.id,
          offerPrice: {
            amount: this.state.offerValue,
            currencyCode: "USD",
          },
          note: this.state.offerNoteValue && this.state.offerNoteValue.value,
        },
      })
      if (orderOrError.error) {
        this.props.dialog.showErrorDialog()
        return
      }
      this.props.router.push(`/orders/${this.props.order.id}/review/counter`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  createCounterOffer(variables: RespondCounterOfferMutation["variables"]) {
    return this.props.commitMutation<RespondCounterOfferMutation>({
      variables,
      mutation: graphql`
        mutation RespondCounterOfferMutation($input: buyerCounterOfferInput!) {
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
    })
  }

  render() {
    const { order, isCommittingMutation } = this.props

    const artworkId = order.lineItems.edges[0].node.artwork.id

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
                  <BorderedRadio value="ACCEPT" label="Accept seller's offer" />
                  <BorderedRadio
                    value="COUNTER"
                    position="relative"
                    label="Send counteroffer"
                  >
                    <Collapse open={this.state.responseOption === "COUNTER"}>
                      <Spacer mb={2} />
                      <OfferInput
                        id="RespondForm_RespondValue"
                        showError={
                          this.state.formIsDirty && this.state.offerValue <= 0
                        }
                        onChange={offerValue => this.setState({ offerValue })}
                        onFocus={this.onOfferInputFocus.bind(this)}
                      />
                      <Spacer mb={0.5} />
                      <RevealButton
                        align="left"
                        buttonLabel="Add note to seller"
                      >
                        <Spacer mb={1} />
                        <OfferNote
                          onChange={offerNoteValue =>
                            this.setState({ offerNoteValue })
                          }
                          artworkId={artworkId}
                          counteroffer
                        />
                      </RevealButton>
                    </Collapse>
                  </BorderedRadio>
                  <BorderedRadio
                    value="DECLINE"
                    position="relative"
                    label="Decline seller's offer"
                  >
                    <Flex position="relative">
                      <Collapse open={this.state.responseOption === "DECLINE"}>
                        <Spacer mb={1} />
                        <Sans size="2" color="black60">
                          Declining an offer will end the negotiation process on
                          this offer.
                        </Sans>
                      </Collapse>
                    </Flex>
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
  injectCommitMutation(injectDialog(trackPageViewWrapper(RespondRoute))),
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
          note
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
