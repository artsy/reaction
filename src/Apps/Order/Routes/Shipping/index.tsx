import {
  BorderedRadio,
  Button,
  Col,
  Collapse,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Shipping_order } from "__generated__/Shipping_order.graphql"
import {
  OrderFulfillmentType,
  ShippingOrderAddressUpdateMutation,
} from "__generated__/ShippingOrderAddressUpdateMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { validatePresence } from "Apps/Order/Utils/formValidators"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Router } from "found"
import { pick } from "lodash"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export interface ShippingProps {
  order: Shipping_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface ShippingState {
  shippingOption: OrderFulfillmentType
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")

@track()
export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state: ShippingState = {
    shippingOption: ((this.props.order.requestedFulfillment &&
      this.props.order.requestedFulfillment.__typename.toUpperCase()) ||
      "SHIP") as OrderFulfillmentType,
    address: this.startingAddress,
    addressErrors: {},
    addressTouched: {},
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

  setShipping(variables: ShippingOrderAddressUpdateMutation["variables"]) {
    return this.props.commitMutation<ShippingOrderAddressUpdateMutation>({
      variables,
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
    })
  }

  onContinueButtonPressed = async () => {
    const { address, shippingOption } = this.state

    if (shippingOption === "SHIP") {
      const { errors, hasErrors } = this.validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return
      }
    }

    try {
      const orderOrError = (await this.setShipping({
        input: {
          orderId: this.props.order.id,
          fulfillmentType: shippingOption,
          shipping: address,
        },
      })).ecommerceSetOrderShipping.orderOrError

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.id}/payment`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  handleSubmitError(error: { code: string; data: string }) {
    logger.error(error)
    const parsedData = get(error, e => JSON.parse(e.data), {})
    if (
      error.code === "missing_region" ||
      error.code === "missing_country" ||
      error.code === "missing_postal_code"
    ) {
      this.props.dialog.showErrorDialog({
        title: "Invalid address",
        message:
          "There was an error processing your address. Please review and try again.",
      })
    } else if (
      error.code === "unsupported_shipping_location" &&
      parsedData.failure_code === "domestic_shipping_only"
    ) {
      this.props.dialog.showErrorDialog({
        title: "Can't ship to that address",
        message:
          "This work can only be shipped to the continental United States.",
      })
    } else {
      this.props.dialog.showErrorDialog()
    }
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
    const { order, isCommittingMutation } = this.props
    const { address, addressErrors, addressTouched } = this.state
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
                      <BorderedRadio
                        value="SHIP"
                        label="Add shipping address"
                      />

                      <BorderedRadio
                        value="PICKUP"
                        label="Arrange for pickup (free)"
                      >
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
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <TransactionDetailsSummaryItem order={order} />
                </Flex>
                <Spacer mb={[2, 3]} />
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
      </>
    )
  }
}

export const ShippingFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(injectCommitMutation(injectDialog(ShippingRoute))),
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
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
    }
  `
)
