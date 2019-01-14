import { Button, Col, Flex, Row, Sans, Spacer } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { Helper } from "Apps/Order/Components/Helper"

import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { Router } from "found"
import React, { Component } from "react"

import { StepSummaryItem } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import { HorizontalPadding } from "Utils/HorizontalPadding"
import { Media } from "Utils/Responsive"
import { logger } from "../Respond"

import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"

import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

interface RejectProps {
  order: Reject_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

interface RejectState {
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps, RejectState> {
  state = {
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
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
    this.props.dialog.showErrorDialog({ title, message })
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
                <Media greaterThan="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={2} />
                  <Helper artworkId={artwork.id} />
                </Media>
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
                    <Spacer mb={2} />
                    <Helper artworkId={artwork.id} />
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
  trackPageViewWrapper(injectDialog(Reject)),
  graphql`
    fragment Reject_order on Order {
      id
      stateExpiresAt
      lastOffer {
        id
        createdAt
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
      ...ArtworkSummaryItem_order
    }
  `
)
