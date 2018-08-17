import { Payment_order } from "__generated__/Payment_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Elements } from "react-stripe-elements"
import { Link } from "Router"
import { Button } from "Styleguide/Elements/Button"
import { Checkbox } from "Styleguide/Elements/Checkbox"
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

const ContinueButton = ({ order }) => (
  <Link to={`/order2/${order.id}/review`}>
    <Button size="large" width="100%">
      Continue
    </Button>
  </Link>
)

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

        <Elements>
          <Responsive>
            {({ xs }) => (
              <TwoColumnLayout
                Content={
                  <>
                    <Join separator={<Spacer mb={3} />}>
                      <CreditCardInput />
                      <Checkbox>
                        Billing and shipping addresses are the same
                      </Checkbox>
                      <Placeholder
                        height="20px"
                        name="Billing/Shipping Check"
                      />
                      {!xs && <ContinueButton order={order} />}
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
                        <ContinueButton order={order} />
                      </>
                    )}
                  </Flex>
                }
              />
            )}
          </Responsive>
        </Elements>
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
