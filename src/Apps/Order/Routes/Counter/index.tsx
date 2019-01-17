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
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
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
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export interface CounterProps {
  order: Counter_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

export interface CounterState {
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Counter/index.tsx")

@track()
export class CounterRoute extends Component<CounterProps, CounterState> {
  state: CounterState = {
    isCommittingMutation: false,
  }

  constructor(props: CounterProps) {
    super(props)
    this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this)
  }

  onSubmitButtonPressed: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      commitMutation<CounterSubmitMutation>(this.props.relay.environment, {
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
        variables: {
          input: {
            offerId: this.props.order.myLastOffer.id,
          },
        },
        onCompleted: result => {
          const {
            ecommerceSubmitPendingOffer: { orderOrError },
          } = result
          this.onSubmitCompleted(orderOrError)
        },
        onError: this.onMutationError.bind(this),
      })
    })
  }

  onMutationError(errors, title?, message?) {
    logger.error(errors)
    this.props.dialog.showErrorDialog({ message, title })
    this.setState({
      isCommittingMutation: false,
    })
  }

  onSubmitCompleted = orderOrError => {
    if (orderOrError.error) {
      const errorCode = orderOrError.error.code
      if (errorCode === "insufficient_inventory") {
        this.onMutationError(
          new ErrorWithMetadata(orderOrError.error.code, orderOrError.error),
          "This work has already been sold.",
          "Please contact orders@artsy.net with any questions."
        )
      } else {
        this.onMutationError(
          new ErrorWithMetadata(orderOrError.error.code, orderOrError.error)
        )
      }
    } else {
      this.onSuccessfulSubmit()
    }
  }

  @track<CounterProps>(props => ({
    action_type: Schema.ActionType.SubmittedCounterOffer,
    order_id: props.order.id,
  }))
  onSuccessfulSubmit() {
    this.setState({ isCommittingMutation: false })
    this.props.router.push(`/orders/${this.props.order.id}/status`)
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
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
                    <Spacer mb={2} />
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
        <StickyFooter orderType={order.mode} artworkId={artwork.id} />
      </>
    )
  }
}

export const CounterFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(injectDialog(CounterRoute)),
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
