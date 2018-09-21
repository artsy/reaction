import {
  BorderedRadio,
  Button,
  Flex,
  RadioGroup,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import {
  OrderFulfillmentType,
  ShippingOrderAddressUpdateMutation,
} from "__generated__/ShippingOrderAddressUpdateMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { validatePresence } from "Apps/Order/Components/Validators"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import { get, pick } from "lodash"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { Collapse } from "Styleguide"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

export interface ShippingProps {
  order: Shipping_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
  relay?: RelayProp
  router: Router
}

export interface ShippingState {
  shippingOption: OrderFulfillmentType
  address: Address
  addressErrors: AddressErrors
  isComittingMutation: boolean
  isErrorModalOpen: boolean
}

export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state = {
    shippingOption: ((this.props.order.requestedFulfillment &&
      this.props.order.requestedFulfillment.__typename.toUpperCase()) ||
      "SHIP") as OrderFulfillmentType,
    isComittingMutation: false,
    isErrorModalOpen: false,
    address: this.startingAddress,
    addressErrors: {},
  }

  get startingAddress() {
    return {
      ...emptyAddress,
      country: "US",
      // We need to pull out _only_ the values specified by the Address type,
      // since our state will be used for Relay variables later on. The
      // easiest way to do this is with the emptyAddress.
      ...pick(this.props.order.requestedFulfillment, Object.keys(emptyAddress)),
    }
  }

  onContinueButtonPressed: () => void = () => {
    this.setState({ isComittingMutation: true }, () => {
      const { address, shippingOption } = this.state

      if (this.state.shippingOption === "SHIP") {
        const errors = this.validateAddress(this.state.address)

        if (Object.keys(errors).filter(key => errors[key]).length > 0) {
          this.setState({ isComittingMutation: false, addressErrors: errors })
          return
        }
      }

      if (this.props.relay && this.props.relay.environment) {
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
                fulfillmentType: shippingOption,
                shipping: address,
              },
            },
            onCompleted: data => {
              this.setState({ isComittingMutation: false })
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
              this.setState({ isComittingMutation: false })
              this.onError(error)
            },
          }
        )
      }
    })
  }

  private validateAddress(address: Address) {
    const {
      name,
      addressLine1,
      city,
      region,
      country,
      postalCode,
      phoneNumber,
    } = address
    return {
      name: validatePresence(name),
      addressLine1: validatePresence(addressLine1),
      city: validatePresence(city),
      region: validatePresence(region),
      country: validatePresence(country),
      postalCode: validatePresence(postalCode),
      phoneNumber: validatePresence(phoneNumber),
    }
  }

  onError = error => {
    console.error("Order/Shipping/index.tsx", error)
    this.setState({ isComittingMutation: false, isErrorModalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        [key]: this.validateAddress(address)[key],
      },
    })
  }

  render() {
    const { order } = this.props
    const { address, addressErrors, isComittingMutation } = this.state
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

                  <Collapse
                    open={
                      !isPickupAvailable || this.state.shippingOption === "SHIP"
                    }
                  >
                    <AddressForm
                      defaultValue={address}
                      errors={addressErrors}
                      onChange={this.onAddressChange}
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
