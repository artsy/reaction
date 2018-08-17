import { Sans, Serif } from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import { Collapse } from "Styleguide/Components/Collapse"
import { CountrySelect } from "Styleguide/Components/CountrySelect"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"
import { Radio } from "Styleguide/Elements/Radio"
import { BorderedRadioGroup } from "Styleguide/Elements/RadioGroup"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

import { Helper } from "Apps/Order/Components/Helper"

import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { Input } from "Components/Input"
import {
  TwoColumnLayout,
  TwoColumnSplit,
} from "../../Components/TwoColumnLayout"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
  relay?: RelayProp
}

// TODO: When the todo for abstracting the address is done and we have an Address component, we won't need this here, so the wonky state generic on ShippingRoute is fine for now.
export interface Address {
  // TODO: Shipping name is not in Exchange's schema yet.
  // See: https://artsyproduct.atlassian.net/browse/PURCHASE-377
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
    address: {},
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
                  <BorderedRadioGroup
                    onSelect={shippingOption =>
                      this.setState({ shippingOption })
                    }
                    defaultValue="SHIP"
                  >
                    <Radio value="SHIP">Provide shipping address</Radio>

                    <Radio value="PICKUP">
                      Arrange for pickup
                      <Collapse open={this.state.shippingOption === "PICKUP"}>
                        <Sans size="2" color="black60">
                          After you place your order, you’ll be appointed an
                          Artsy Specialist within 2 business days to handle
                          pickup logistics.
                        </Sans>
                      </Collapse>
                    </Radio>
                  </BorderedRadioGroup>

                  <Spacer mb={3} />

                  <Collapse open={this.state.shippingOption === "SHIP"}>
                    {/* TODO: This address entry form should be abstracted into its own component, to be used on the billing address screen. */}
                    {/* See: https://artsyproduct.atlassian.net/browse/PURCHASE-375 */}
                    <Join separator={<Spacer mb={2} />}>
                      <Flex flexDirection="column">
                        <Input
                          placeholder="Add full name"
                          title="Full name"
                          onChange={this.onUpdateName}
                          block
                        />
                      </Flex>

                      <TwoColumnSplit>
                        <Flex flexDirection="column" pb={1}>
                          <Serif
                            mb={1}
                            size="3t"
                            color="black100"
                            lineHeight={18}
                          >
                            Country
                          </Serif>
                          <CountrySelect
                            selected={this.state.country || "US"}
                            onSelect={this.onUpdateCountry}
                          />
                        </Flex>

                        <Flex flexDirection="column">
                          <Input
                            placeholder="Add postal code"
                            title="Postal code"
                            onChange={this.onUpdatePostalCode}
                            block
                          />
                        </Flex>
                      </TwoColumnSplit>
                      <TwoColumnSplit>
                        <Flex flexDirection="column">
                          <Input
                            placeholder="Add street address"
                            title="Address line 1"
                            onChange={this.onUpdateAddressLine1}
                            block
                          />
                        </Flex>

                        <Flex flexDirection="column">
                          <Input
                            placeholder="Add apt, floor, suite, etc."
                            title="Address line 2 (optional)"
                            onChange={this.onUpdateAddressLine2}
                            block
                          />
                        </Flex>
                      </TwoColumnSplit>
                      <TwoColumnSplit>
                        <Flex flexDirection="column">
                          <Input
                            placeholder="Add city"
                            title="City"
                            onChange={this.onUpdateCity}
                            block
                          />
                        </Flex>

                        <Flex flexDirection="column">
                          <Input
                            placeholder="Add State, province, or region"
                            title="State, province, or region"
                            onChange={this.onUpdateRegion}
                            block
                          />
                        </Flex>
                      </TwoColumnSplit>
                    </Join>
                    <Spacer mb={2} />
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
