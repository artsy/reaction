import {
  BorderedRadio,
  Button,
  Collapse,
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
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"
import { Helper } from "Apps/Order/Components/Helper"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { validatePresence } from "Apps/Order/Utils/formValidators"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import { pick } from "lodash"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export interface ShippingProps {
  order: Shipping_order
  mediator: Mediator
  relay?: RelayProp
  router: Router
}

export interface ShippingState {
  shippingOption: OrderFulfillmentType
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalTitle: string
  errorModalMessage: string
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")

@track()
export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state = {
    shippingOption: ((this.props.order.requestedFulfillment &&
      this.props.order.requestedFulfillment.__typename.toUpperCase()) ||
      "SHIP") as OrderFulfillmentType,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    address: this.startingAddress,
    addressErrors: {},
    addressTouched: {},
    errorModalTitle: null,
    errorModalMessage: null,
  }

  componentDidMount() {
    this.props.mediator.trigger("order:shipping")
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

  get touchedAddress() {
    return {
      name: true,
      country: true,
      postalCode: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      region: true,
      phoneNumber: true,
    }
  }

  onContinueButtonPressed: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      const { address, shippingOption } = this.state

      if (this.state.shippingOption === "SHIP") {
        const { errors, hasErrors } = this.validateAddress(this.state.address)
        if (hasErrors) {
          this.setState({
            isCommittingMutation: false,
            addressErrors: errors,
            addressTouched: this.touchedAddress,
          })
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
                ecommerceSetOrderShipping(input: $input) {
                  orderOrError {
                    ... on OrderWithMutationSuccess {
                      __typename
                      order {
                        id
                        state
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
              this.setState({ isCommittingMutation: false })
              const {
                ecommerceSetOrderShipping: { orderOrError },
              } = data

              if (orderOrError.error) {
                const errorCode = orderOrError.error.code
                const errorData = get(
                  orderOrError,
                  o => JSON.parse(o.error.data),
                  {}
                )
                if (
                  errorCode === "missing_region" ||
                  errorCode === "missing_country" ||
                  errorCode === "missing_postal_code"
                ) {
                  this.onMutationError(
                    orderOrError.error,
                    "Invalid address",
                    "There was an error processing your address. Please review and try again."
                  )
                } else if (
                  errorCode === "unsupported_shipping_location" &&
                  errorData.failure_code === "domestic_shipping_only"
                ) {
                  this.onMutationError(
                    orderOrError.error,
                    "Can't ship to that address",
                    "This work can only be shipped to the continental United States."
                  )
                } else {
                  this.onMutationError(orderOrError.error)
                }
              } else {
                this.props.router.push(`/orders/${this.props.order.id}/payment`)
              }
            },
            onError: this.onMutationError.bind(this),
          }
        )
      }
    })
  }

  onMutationError(errors, errorModalTitle?, errorModalMessage?) {
    logger.error(errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
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
    const usOrCanada = country === "US" || country === "CA"
    const errors = {
      name: validatePresence(name),
      addressLine1: validatePresence(addressLine1),
      city: validatePresence(city),
      region: usOrCanada && validatePresence(region),
      country: validatePresence(country),
      postalCode: usOrCanada && validatePresence(postalCode),
      phoneNumber: validatePresence(phoneNumber),
    }
    const hasErrors = Object.keys(errors).filter(key => errors[key]).length > 0

    return {
      errors,
      hasErrors,
    }
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = this.validateAddress(address)
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        ...errors,
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
    })
  }

  @track((props, state, args) => ({
    action_type: Schema.ActionType.Click,
    subject:
      args[0] === "SHIP"
        ? Schema.Subject.BNMOProvideShipping
        : Schema.Subject.BNMOArrangePickup,
    flow: "buy now",
    type: "button",
  }))
  onSelectShippingOption(shippingOption: OrderFulfillmentType) {
    this.setState({ shippingOption })
  }

  render() {
    const { order } = this.props
    const {
      address,
      addressErrors,
      addressTouched,
      isCommittingMutation,
    } = this.state
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
                currentStep="Shipping"
                steps={
                  order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps
                }
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
                {/* TODO: Make RadioGroup generic for the allowed values,
                    which could also ensure the children only use
                    allowed values. */}
                {artwork.pickup_available && (
                  <>
                    <RadioGroup
                      onSelect={this.onSelectShippingOption.bind(this)}
                      defaultValue={this.state.shippingOption}
                    >
                      <BorderedRadio value="SHIP">
                        Add shipping address
                      </BorderedRadio>

                      <BorderedRadio value="PICKUP">
                        Arrange for pickup (free)
                        <Collapse open={this.state.shippingOption === "PICKUP"}>
                          <Sans size="2" color="black60">
                            After your order is confirmed, a specialist will
                            contact you within 2 business days to coordinate
                            pickup.
                          </Sans>
                        </Collapse>
                      </BorderedRadio>
                    </RadioGroup>
                    <Spacer mb={3} />
                  </>
                )}

                <Collapse
                  open={
                    !artwork.pickup_available ||
                    this.state.shippingOption === "SHIP"
                  }
                >
                  <AddressForm
                    value={address}
                    errors={addressErrors}
                    touched={addressTouched}
                    onChange={this.onAddressChange}
                    continentalUsOnly={artwork.shipsToContinentalUSOnly}
                  />
                </Collapse>

                <Media greaterThan="xs">
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Continue
                  </Button>
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <TransactionSummary order={order} mb={[2, 3]} />
                <Helper artworkId={artwork.id} />
                <Media at="xs">
                  <Spacer mb={3} />
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Continue
                  </Button>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="orders@artsy.net"
          detailText={this.state.errorModalMessage}
          headerText={this.state.errorModalTitle}
        />
      </>
    )
  }
}

const ShippingRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <ShippingRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const ShippingFragmentContainer = createFragmentContainer(
  ShippingRouteWrapper,
  graphql`
    fragment Shipping_order on Order {
      id
      mode
      state
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
              shipsToContinentalUSOnly
            }
          }
        }
      }
      ...TransactionSummary_order
    }
  `
)
