import { Payment_order } from "__generated__/Payment_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Elements } from "react-stripe-elements"
import { Link } from "Router"
import { Collapse } from "Styleguide/Components/Collapse"
import { Button } from "Styleguide/Elements/Button"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"
import { AddressForm } from "../../Components/AddressForm"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"
import { Address } from "../Shipping"

export interface PaymentProps {
  order: Payment_order
}

interface PaymentState {
  country: string
  hideBillingAddress: boolean
}

const ContinueButton = ({ order }) => (
  <Link to={`/order2/${order.id}/review`}>
    <Button size="large" width="100%">
      Continue
    </Button>
  </Link>
)

export class PaymentRoute extends Component<
  PaymentProps,
  PaymentState & Address
> {
  state = { country: "USA", hideBillingAddress: true }
  onUpdateName = e => this.setState({ name: e.target.value })
  onUpdateAddressLine1 = e => this.setState({ addressLine1: e.target.value })
  onUpdateAddressLine2 = e => this.setState({ addressLine2: e.target.value })
  onUpdateCity = e => this.setState({ city: e.target.value })
  onUpdateRegion = e => this.setState({ region: e.target.value })
  onUpdateCountry = country => this.setState({ country })
  onUpdatePostalCode = e => this.setState({ postalCode: e.target.value })

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
                      <Checkbox
                        selected={this.state.hideBillingAddress}
                        onSelect={hideBillingAddress =>
                          this.setState({ hideBillingAddress })
                        }
                      >
                        Billing and shipping addresses are the same
                      </Checkbox>
                      <Collapse open={!this.state.hideBillingAddress}>
                        <AddressForm
                          country={this.state.country}
                          onUpdateName={this.onUpdateName}
                          onUpdateAddressLine1={this.onUpdateAddressLine1}
                          onUpdateAddressLine2={this.onUpdateAddressLine2}
                          onUpdateCity={this.onUpdateCity}
                          onUpdateRegion={this.onUpdateRegion}
                          onUpdateCountry={this.onUpdateCountry}
                          onUpdatePostalCode={this.onUpdatePostalCode}
                        />
                      </Collapse>
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
