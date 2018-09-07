import { Sans } from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { Router } from "found"
import React, { Component } from "react"
import { Collapse } from "Styleguide/Components"
import { Responsive } from "Utils/Responsive"
import {
  Address,
  AddressForm,
  emptyAddress,
} from "../../Components/AddressForm"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

import {
  OrderFulfillmentType,
  ShippingOrderAddressUpdateMutation,
} from "__generated__/ShippingOrderAddressUpdateMutation.graphql"

import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import {
  BorderedRadio,
  Button,
  Col,
  Flex,
  RadioGroup,
  Row,
  Spacer,
} from "Styleguide/Elements"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
  relay?: RelayProp
  router: Router
}

export interface ShippingState {
  address: Address
  shippingOption: OrderFulfillmentType
  isComittingMutation: boolean
}

export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  // TODO: Fill in with Relay data on load.
  // See: https://artsyproduct.atlassian.net/browse/PURCHASE-376
  state = {
    shippingOption: "SHIP" as OrderFulfillmentType,
    address: {
      ...emptyAddress,
      country: "US",
    },
    isComittingMutation: false,
  }

  onContinueButtonPressed = () => {
    if (this.props.relay && this.props.relay.environment) {
      // We don't strictly need to wait for the state to be set, but it makes it easier to test.
      this.setState({ isComittingMutation: true }, () => {
        commitMutation<ShippingOrderAddressUpdateMutation>(
          this.props.relay.environment,
          {
            mutation: graphql`
              mutation ShippingOrderAddressUpdateMutation(
                $input: SetOrderShippingInput!
              ) {
                setOrderShipping(input: $input) {
                  orderOrError {
                    ... on OrderWithMutationSuccess {
                      order {
                        state
                      }
                    }
                    ... on OrderWithMutationFailure {
                      error {
                        description
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              input: {
                orderId: this.props.order.id,
                fulfillmentType: this.state.shippingOption,
                shipping: this.state.address,
              },
            },
            onCompleted: () =>
              // Note: We are only waiting for _a_ response and are not yet handling errors.
              this.props.router.push(`/order2/${this.props.order.id}/payment`),
          }
        )
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
                  {/* TODO: Make RadioGroup generic for the allowed values,
                            which could also ensure the children only use
                            allowed values. */}
                  <RadioGroup
                    onSelect={(shippingOption: OrderFulfillmentType) =>
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
                    <Spacer mb={2} />
                    <AddressForm
                      defaultValue={this.state.address}
                      onChange={address => this.setState({ address })}
                    />
                  </Collapse>

                  {!xs && (
                    <Button
                      onClick={this.onContinueButtonPressed}
                      loading={this.state.isComittingMutation}
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
                        loading={this.state.isComittingMutation}
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
