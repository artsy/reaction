import { Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { StepSummaryItem } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { Col, Row } from "Styleguide/Elements"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { Media } from "Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"

interface RejectProps {
  order: Reject_order
  router: Router
}

interface RejectState {
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps, RejectState> {
  state = {
    isCommittingMutation: false,
  }

  onSubmit: () => void = () => {
    console.log("DECLINED!")
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
  Reject,
  graphql`
    fragment Reject_order on Order {
      id
      stateExpiresAt
      lastOffer {
        createdAt
      }
      ...ArtworkSummaryItem_order
    }
  `
)
