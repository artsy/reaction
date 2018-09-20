import { Shipping_order } from "__generated__/Shipping_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { Router } from "found"
import { get, pick } from "lodash"
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
  Flex,
  RadioGroup,
  Sans,
  Spacer,
} from "@artsy/palette"

import { ErrorModal } from "Components/Modal/ErrorModal"
import { Col, Row } from "Styleguide/Elements/Grid"

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
  isErrorModalOpen: boolean
}

export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state = {
    shippingOption: ((this.props.order.requestedFulfillment &&
      this.props.order.requestedFulfillment.__typename.toUpperCase()) ||
      "SHIP") as OrderFulfillmentType,
    address: {
      ...emptyAddress,
      country: "US",
      // We need to pull out _only_ the values specified by the Address type,
      // since our state will be used for Relay variables later on. The
      // easiest way to do this is with the emptyAddress.
      ...pick(this.props.order.requestedFulfillment, Object.keys(emptyAddress)),
    },
    isComittingMutation: false,
    isErrorModalOpen: false,
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
                orderId: this.props.order.id,
                fulfillmentType: this.state.shippingOption,
                shipping: this.state.address,
              },
            },
            onCompleted: data => {
              const {
                setOrderShipping: { orderOrError },
              } = data

              if (orderOrError.error) {
                this.onError(orderOrError.error)
              } else {
                this.props.router.push(`/order2/${this.props.order.id}/payment`)
              }
            },
            onError: error => {
              this.onError(error)
            },
          }
        )
      })
    }
  }

  onError = error => {
    console.error("Order/Shipping/index.tsx", error)
    this.setState({ isComittingMutation: false, isErrorModalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  render() {
    const { order } = this.props
    const { isComittingMutation } = this.state
    const isPickupAvailable = get(
      this.props,
      "order.lineItems.edges[0].node.artwork.pickup_available"
    )

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
                <Flex
                  flexDirection="column"
                  style={isComittingMutation ? { pointerEvents: "none" } : {}}
                >
                  {/* TODO: Make RadioGroup generic for the allowed values,
                  which could also ensure the children only use
                  allowed values. */}
                  {isPickupAvailable && (
                    <>
                      <RadioGroup
                        onSelect={(shippingOption: OrderFulfillmentType) =>
                          this.setState({ shippingOption })
                        }
                        defaultValue={this.state.shippingOption}
                      >
                        <BorderedRadio value="SHIP">
                          Provide shipping address
                        </BorderedRadio>

                        <BorderedRadio value="PICKUP">
                          Arrange for pickup
                          <Collapse
                            open={this.state.shippingOption === "PICKUP"}
                          >
                            <Sans size="2" color="black60">
                              After you place your order, you’ll be appointed an
                              Artsy Specialist within 2 business days to handle
                              pickup logistics.
                            </Sans>
                          </Collapse>
                        </BorderedRadio>
                      </RadioGroup>
                      <Spacer mb={3} />
                    </>
                  )}

                  <Collapse open={this.state.shippingOption === "SHIP"}>
                    <AddressForm
                      defaultValue={this.state.address}
                      onChange={address => this.setState({ address })}
                    />
                  </Collapse>

                  {!xs && (
                    <Button
                      onClick={this.onContinueButtonPressed}
                      loading={isComittingMutation}
                      size="large"
                      width="100%"
                    >
                      Continue
                    </Button>
                  )}
                </Flex>
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
                        loading={isComittingMutation}
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
        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
        />
      </>
    )
  }
}

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRoute,
  graphql`
    fragment Shipping_order on Order {
      id
      requestedFulfillment {
        __typename
        ... on Ship {
          name
          addressLine1
          addressLine2
          city
          region
          country
          postalCode
          phoneNumber
        }
      }
      lineItems {
        edges {
          node {
            artwork {
              id
              pickup_available
            }
          }
        }
      }
      ...TransactionSummary_order
    }
  `
)
