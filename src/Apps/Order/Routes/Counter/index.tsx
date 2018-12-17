import { Button, Flex, Spacer } from "@artsy/palette"
import { Counter_order } from "__generated__/Counter_order.graphql"
import { CounterSubmitMutation } from "__generated__/CounterSubmitMutation.graphql"
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
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
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
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export interface CounterProps {
  order: Counter_order
  mediator: Mediator
  relay?: RelayProp
  router: Router
}

export interface CounterState {
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalTitle: string
  errorModalMessage: string
}

const logger = createLogger("Order/Routes/Counter/index.tsx")

export class CounterRoute extends Component<CounterProps, CounterState> {
  state = {
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
  } as CounterState

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

  onMutationError(errors, errorModalTitle?, errorModalMessage?) {
    logger.error(errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
    })
  }

  onSubmitCompleted = orderOrError => {
    if (orderOrError.error) {
      this.onMutationError(
        new ErrorWithMetadata(orderOrError.error.code, orderOrError.error)
      )
    } else {
      this.props.router.push(`/orders/${this.props.order.id}/status`)
    }
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
  }

  render() {
    const { order } = this.props
    const { isCommittingMutation } = this.state

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
                <Spacer mb={3} />
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
                    <Spacer mb={[2, 3]} />
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

const CounterRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <CounterRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const CounterFragmentContainer = createFragmentContainer(
  CounterRouteWrapper,
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
      ...TransactionDetailsSummaryItem_order
      ...ArtworkSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      ...OfferHistoryItem_order
    }
  `
)
