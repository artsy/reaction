import { Sans } from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import { Collapse } from "Styleguide/Components/Collapse"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { BorderedRadio } from "Styleguide/Elements/Radio"
import { RadioGroup } from "Styleguide/Elements/RadioGroup"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

import { Helper } from "Apps/Order/Components/Helper"

import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { AddressForm } from "../../Components/AddressForm"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
  relay?: RelayProp
}

// TODO: When the todo for abstracting the address is done and we have an Address component, we won't need this here, so the wonky state generic on ShippingRoute is fine for now.
export interface Address {
  name?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  region?: string
  country?: string
  postalCode?: string
}

export interface ShippingState {
  shippingOption: string
}

export class ShippingRoute extends Component<
  ShippingProps,
  ShippingState & Address
> {
  // TODO: Fill in with Relay data on load.
  // See: https://artsyproduct.atlassian.net/browse/PURCHASE-376
  state = {
    shippingOption: "SHIP",
  } as ShippingState & Address

  // TODO: This can be handled with Formik.
  // See: https://artsyproduct.atlassian.net/browse/PURCHASE-375
  onUpdateName = e => this.setState({ name: e.target.value })
  onUpdateAddressLine1 = e => this.setState({ addressLine1: e.target.value })
  onUpdateAddressLine2 = e => this.setState({ addressLine2: e.target.value })
  onUpdateCity = e => this.setState({ city: e.target.value })
  onUpdateRegion = e => this.setState({ region: e.target.value })
  onUpdateCountry = country => this.setState({ country })
  onUpdatePostalCode = e => this.setState({ postalCode: e.target.value })

  onContinueButtonPressed = () => {
    if (this.props.relay && this.props.relay.environment) {
      commitMutation(this.props.relay.environment, {
        mutation: graphql`
          mutation ShippingOrderAddressUpdateMutation(
            $input: SetOrderShippingInput!
          ) {
            setOrderShipping(input: $input) {
              result {
                order {
                  state
                }
              }
            }
          }
        `,
        variables: {
          input: {
            orderId: this.props.order.id,
            fulfillmentType: this.state.shippingOption,
            shippingName: this.state.name || "",
            shippingAddressLine1: this.state.addressLine1 || "",
            shippingAddressLine2: this.state.addressLine2 || "",
            shippingCity: this.state.city || "",
            shippingRegion: this.state.region || "",
            shippingCountry: this.state.country || "",
            shippingPostalCode: this.state.postalCode || "",
          },
        },
      })
    }
  }

  render() {
    const { order } = this.props
    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"shipping"} />
          </Col>
        </Row>
        <Spacer mb={3} />
        <Responsive>
          {({ xs }) => (
            <TwoColumnLayout
              Content={
                <>
                  <RadioGroup
                    onSelect={shippingOption =>
                      this.setState({ shippingOption })
                    }
                    defaultValue="SHIP"
                  >
                    <BorderedRadio value="SHIP">
                      Provide shipping address
                    </BorderedRadio>

                    <BorderedRadio value="PICKUP">
                      Arrange for pickup
                      <Collapse open={this.state.shippingOption === "PICKUP"}>
                        <Sans size="2" color="black60">
                          After you place your order, you’ll be appointed an
                          Artsy Specialist within 2 business days to handle
                          pickup logistics.
                        </Sans>
                      </Collapse>
                    </BorderedRadio>
                  </RadioGroup>

                  <Spacer mb={3} />

                  <Collapse open={this.state.shippingOption === "SHIP"}>
                    {/* TODO: This address entry form should be abstracted into its own component, to be used on the billing address screen. */}
                    {/* See: https://artsyproduct.atlassian.net/browse/PURCHASE-375 */}
                    <Spacer mb={2} />
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

                  {!xs && (
                    <Button
                      onClick={this.onContinueButtonPressed}
                      size="large"
                      width="100%"
                    >
                      Continue
                    </Button>
                  )}
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
                      <Button
                        onClick={this.onContinueButtonPressed}
                        size="large"
                        width="100%"
                      >
                        Continue
                      </Button>
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

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRoute,
  graphql`
    fragment Shipping_order on Order {
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
