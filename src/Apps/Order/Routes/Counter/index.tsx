import { Button, Col, Flex, Row, Spacer } from "@artsy/palette"
import { Counter_order } from "__generated__/Counter_order.graphql"
import { CounterSubmitMutation } from "__generated__/CounterSubmitMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "Apps/Order/Components/CreditCardSummaryItem"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export interface CounterProps {
  order: Counter_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Counter/index.tsx")

@track()
export class CounterRoute extends Component<CounterProps> {
  constructor(props: CounterProps) {
    super(props)
    this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this)
  }

  submitPendingOffer(variables: CounterSubmitMutation["variables"]) {
    return this.props.commitMutation<CounterSubmitMutation>({
      variables,
      mutation: graphql`
        mutation CounterSubmitMutation($input: submitPendingOfferInput!) {
          ecommerceSubmitPendingOffer(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  state
                  ... on OfferOrder {
                    awaitingResponseFrom
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
    })
  }

  onSubmitButtonPressed = async () => {
    try {
      const {
        ecommerceSubmitPendingOffer: { orderOrError },
      } = await this.submitPendingOffer({
        input: {
          offerId: this.props.order.myLastOffer.id,
        },
      })

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.onSuccessfulSubmit()
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  handleSubmitError(error: { code: string }) {
    logger.error(error)
    if (error.code === "insufficient_inventory") {
      this.props.dialog.showErrorDialog({
        title: "This work has already been sold.",
        message: "Please contact orders@artsy.net with any questions.",
      })
    } else {
      this.props.dialog.showErrorDialog()
    }
  }

  @track<CounterProps>(props => ({
    action_type: Schema.ActionType.SubmittedCounterOffer,
    order_id: props.order.id,
  }))
  onSuccessfulSubmit() {
    this.props.router.push(`/orders/${this.props.order.id}/status`)
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
  }

  render() {
    const { order, isCommittingMutation } = this.props

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Review"
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
                  <TransactionDetailsSummaryItem
                    order={order}
                    title="Your counteroffer"
                    onChange={this.onChangeResponse}
                    offerContextPrice="LAST_OFFER"
                    showOfferNote={true}
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Flex flexDirection="column" />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onSubmitButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer textAlign="center" />
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
                <Media greaterThan="xs">
                  <Spacer mb={2} />
                </Media>
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <>
                    <Button
                      onClick={this.onSubmitButtonPressed}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer />
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

export const CounterFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(injectCommitMutation(injectDialog(CounterRoute))),
  graphql`
    fragment Counter_order on Order {
      id
      mode
      state
      itemsTotal(precision: 2)
      totalListPrice(precision: 2)
      stateExpiresAt
      ... on OfferOrder {
        lastOffer {
          createdAt
        }
        myLastOffer {
          id
        }
      }
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
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
