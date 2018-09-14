import { Shipping_order } from "__generated__/Shipping_order.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressField,
  AddressFields,
  emptyAddress,
  Touched,
} from "Apps/Order/Components/AddressFields"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { Router } from "found"
import { pick } from "lodash"
import React, { Component } from "react"

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

import { requiredFields } from "Apps/Order/Components/Validators"

import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ErrorModal } from "Components/Modal/ErrorModal"
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
  errors: AddressErrors
  touched: Touched<Address> // TODO: remove?
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
    touched: {},
    errors: {},
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

  onContinue: () => void = () => {
    const { address, shippingOption } = this.state
    if (this.props.relay && this.props.relay.environment) {
      this.setState({ isComittingMutation: true })
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
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isComittingMutation: true }, () => {
      const errors = this.validate()
      if (Object.keys(errors).length) {
        // const touched: Touched<Address> = reduce(
        //   Object.keys(this.state.address),
        //   (acc, k) => ({ ...acc, [k]: true }),
        //   {}
        // )
        this.setState({ isComittingMutation: false, errors })
      } else {
        // submit the form
        this.onContinue()
      }
    })
  }

  validate = () => {
    if (this.state.shippingOption === "SHIP") {
      const fields: AddressField[] = [
        "name",
        "addressLine1",
        "city",
        "postalCode",
        "region",
        "country",
        "phoneNumber",
      ]
      return requiredFields(fields, this.state.address)
    }
    return {}
  }

  onError = error => {
    console.error("Order/Shipping/index.tsx", error)
    this.setState({ isComittingMutation: false, isErrorModalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  handleChangeShippingOption = (shippingOption: OrderFulfillmentType) => {
    this.setState({ shippingOption })
  }

  handleChangeAddress: AddressChangeHandler = event => {
    event.preventDefault()
    const {
      target: { value, name },
    } = event
    this.setState(oldState => ({
      address: { ...oldState.address, [name]: value },
    }))
  }

  handleTouchAddress: AddressChangeHandler = event => {
    event.preventDefault()
    const {
      target: { name },
    } = event
    this.setState(oldState => ({
      touched: { ...oldState.touched, [name]: true },
    }))
  }

  render() {
    const { address, errors, isComittingMutation } = this.state
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
                    onSelect={this.handleChangeShippingOption}
                    defaultValue={this.state.shippingOption}
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
                    <AddressFields
                      values={address}
                      errors={errors}
                      onChange={this.handleChangeAddress}
                    />
                  </Collapse>

                  {!xs && (
                    <Button
                      onClick={this.handleSubmit}
                      loading={isComittingMutation}
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
                  <TransactionSummary
                    order={this.props.order}
                    mb={xs ? 2 : 3}
                  />
                  <Helper
                    artworkId={
                      this.props.order.lineItems.edges[0].node.artwork.id
                    }
                  />
                  {xs && (
                    <>
                      <Spacer mb={3} />
                      <Button
                        onClick={this.handleSubmit}
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
            }
          }
        }
      }
      ...TransactionSummary_order
    }
  `
)
