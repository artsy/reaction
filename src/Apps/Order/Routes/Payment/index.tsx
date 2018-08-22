import { Payment_order } from "__generated__/Payment_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

export interface PaymentProps {
  order: Payment_order
}

export class PaymentRoute extends Component<PaymentProps> {
  render() {
    const { order } = this.props
    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"payment"} />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Responsive>
          {({ xs }) => (
            <TwoColumnLayout
              Content={
                <>
                  <Join separator={<Spacer mb={3} />}>
                    <Placeholder height="68px" name="Credit Card" />
                    <Placeholder height="20px" name="Billing/Shipping Check" />
                    {!xs && (
                      <Link to={`/order2/${order.id}/review`}>
                        <Button size="large" width="100%">
                          Continue
                        </Button>
                      </Link>
                    )}
                  </Join>
                  <Spacer mb={3} />
                </>
              }
              Sidebar={
                <Flex flexDirection="column">
                  <TransactionSummary order={order} mb={xs ? 2 : 3} />
                  <Helper
                    artworkId={order.lineItems.edges[0].node.artwork.id}
                  />
                  {xs && (
                    <>
                      <Spacer mb={3} />
                      <Link to={`/order2/${order.id}/review`}>
                        <Button size="large" width="100%">
                          Continue
                        </Button>
                      </Link>
                    </>
                  )}
                </Flex>
              }
            />
          )}
        </Responsive>
      </>
    )
  }
}

export const PaymentFragmentContainer = createFragmentContainer(
  PaymentRoute,
  graphql`
    fragment Payment_order on Order {
      id
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ...TransactionSummary_order
    }
  `
)
