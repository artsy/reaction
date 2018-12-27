import { Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ShowErrorModal } from "Apps/Order/ErrorModalContext"
import { wrapOrderAppPage } from "Apps/Order/OrderApp"
import { Mediator } from "Artsy/SystemContext"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { StepSummaryItem } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { Col, Row } from "Styleguide/Elements"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ErrorWithMetadata } from "Utils/errors"
import { Media } from "Utils/Responsive"
import { logger } from "../Respond"

interface RejectProps {
  mediator: Mediator
  order: Reject_order
  relay?: RelayProp
  router: Router
  showErrorModal: ShowErrorModal
}

interface RejectState {
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps, RejectState> {
  state = {
    isCommittingMutation: false,
  }

  onSubmit: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        commitMutation<RejectOfferMutation>(this.props.relay.environment, {
          mutation: graphql`
            mutation RejectOfferMutation($input: buyerRejectOfferInput!) {
              ecommerceBuyerRejectOffer(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    __typename
                    order {
                      id
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
            },
          },
          onCompleted: data => {
            this.setState({ isCommittingMutation: false })
            const {
              ecommerceBuyerRejectOffer: { orderOrError },
            } = data

            if (orderOrError.error) {
              this.onMutationError(
                new ErrorWithMetadata(
                  orderOrError.error.code,
                  orderOrError.error
                )
              )
            } else {
              this.props.router.push(`/orders/${this.props.order.id}/status`)
            }
          },
          onError: this.onMutationError.bind(this),
        })
      }
    })
  }

  onMutationError(error, title?, message?) {
    logger.error(error)
    this.props.showErrorModal({ title, message })
    this.setState({
      isCommittingMutation: false,
    })
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
                <Media at="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={2} />
                </Media>
                <Flex flexDirection="column">
                  <CountdownTimer
                    action="Respond"
                    note="Expired offers end the negotiation process permanently."
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <StepSummaryItem
                    title="Decline seller's offer"
                    onChange={this.onChangeResponse}
                  >
                    <Sans size="2" color="black60">
                      Declining an offer permanently ends the negotiation
                      process. The seller will not be able to make a
                      counteroffer.
                    </Sans>
                  </StepSummaryItem>
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onSubmit}
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
                  <Media greaterThan="xs">
                    <ArtworkSummaryItem order={order} />
                  </Media>
                </Flex>
                <Media at="xs">
                  <>
                    <Button
                      onClick={this.onSubmit}
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
export const RejectFragmentContainer = createFragmentContainer(
  wrapOrderAppPage(Reject),
  graphql`
    fragment Reject_order on Order {
      id
      stateExpiresAt
      lastOffer {
        id
        createdAt
      }
      ...ArtworkSummaryItem_order
    }
  `
)
