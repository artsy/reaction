import { Button, Col, Flex, Row, Sans, Spacer } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { Router } from "found"
import React, { Component } from "react"

import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { StepSummaryItem } from "Components/v2"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { Media } from "Utils/Responsive"
import { logger } from "../Respond"

import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"

import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"

interface RejectProps {
  order: Reject_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps> {
  rejectOffer(variables: RejectOfferMutation["variables"]) {
    return this.props.commitMutation<RejectOfferMutation>({
      variables,
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
    })
  }

  onSubmit = async () => {
    try {
      const orderOrError = (await this.rejectOffer({
        input: {
          offerId: this.props.order.lastOffer.id,
        },
      })).ecommerceBuyerRejectOffer.orderOrError

      if (orderOrError.error) {
        throw orderOrError.error
      }

      this.props.router.push(`/orders/${this.props.order.id}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
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
  trackPageViewWrapper(injectCommitMutation(injectDialog(Reject))),
  {
    order: graphql`
      fragment Reject_order on Order {
        id
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
            id
            createdAt
          }
        }
        ...ArtworkSummaryItem_order
      }
    `,
  }
)
