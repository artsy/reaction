import { Button, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { Accept_order } from "__generated__/Accept_order.graphql"
import { Helper } from "Apps/Order/Components/Helper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ContextConsumer } from "Artsy"
import { Mediator } from "Artsy/SystemContext"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { Col, Row } from "Styleguide/Elements"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { Media } from "Utils/Responsive"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "../../Components/OrderStepper"

import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { get } from "Utils/get"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"

interface AcceptProps {
  mediator: Mediator
  order: Accept_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
}

interface AcceptState {
  isCommittingMutation: boolean
}

export class Accept extends Component<AcceptProps, AcceptState> {
  state = {
    isCommittingMutation: false,
  }

  onSubmit: () => void = () => {
    console.log("SUBMITTED!")
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
                  <TransactionDetailsSummaryItem
                    order={order}
                    renderHeaderEntry={this.renderHeaderEntry.bind(this)}
                    useLastSubmittedOffer={true}
                  />
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
                  <Sans textAlign="center" size="2" color="black60">
                    By clicking Submit, I agree to Artsy’s{" "}
                    <a
                      href="https://www.artsy.net/conditions-of-sale"
                      target="_blank"
                    >
                      Conditions of Sale
                    </a>
                    .
                  </Sans>
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <Media greaterThan="xs">
                    <ArtworkSummaryItem order={order} />
                  </Media>
                  <ShippingSummaryItem order={order} locked />
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Media greaterThan="xs">
                  <Spacer mb={3} />
                  <Helper artworkId={artwork.id} />
                </Media>
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
                    <Button
                      onClick={this.onSubmit}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <Sans size="2" color="black60">
                      By clicking Submit, I agree to Artsy’s{" "}
                      <a
                        href="https://www.artsy.net/conditions-of-sale"
                        target="_blank"
                      >
                        Conditions of Sale
                      </a>
                      .
                    </Sans>
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

  renderHeaderEntry() {
    const { id } = this.props.order

    return (
      <>
        <Flex justifyContent="space-between" alignItems="baseline">
          <div>
            <Serif size={["2", "3t"]} weight="semibold" color="black100">
              Accept seller's offer
            </Serif>
          </div>
          <div>
            <Sans size="2">
              <a className="colorLink" href={`/orders/${id}/review`}>
                Change
              </a>
            </Sans>
          </div>
        </Flex>
        <Spacer mb={2} />
      </>
    )
  }
}

const AcceptRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <Accept {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const AcceptFragmentContainer = createFragmentContainer(
  AcceptRouteWrapper,
  graphql`
    fragment Accept_order on Order {
      id
      stateExpiresAt
      lastOffer {
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
      ...TransactionDetailsSummaryItem_order
      ...ArtworkSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
    }
  `
)
