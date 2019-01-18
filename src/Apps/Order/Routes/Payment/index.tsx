import { Payment_order } from "__generated__/Payment_order.graphql"
import { PaymentRouteCreateCreditCardMutation } from "__generated__/PaymentRouteCreateCreditCardMutation.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"

import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { validateAddress } from "Apps/Order/Utils/formValidators"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayRefetchProp,
} from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import {
  Box,
  Button,
  Checkbox,
  Col,
  Collapse,
  Flex,
  Join,
  Row,
  Serif,
  Spacer,
} from "@artsy/palette"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  relay?: RelayRefetchProp
  router: Router
  dialog: Dialog
}

interface PaymentState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Payment/index.tsx")

@track()
export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state = {
    hideBillingAddress: true,
    stripeError: null,
    isCommittingMutation: false,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
  }

  startingAddress(): Address {
    return {
      ...emptyAddress,
      country: "US",
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

  onContinue: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.needsAddress()) {
        const { errors, hasErrors } = validateAddress(this.state.address)
        if (hasErrors) {
          this.setState({
            isCommittingMutation: false,
            addressErrors: errors,
            addressTouched: this.touchedAddress,
          })
          return
        }
      }

      const { address } = this.state
      const stripeBillingAddress = this.getStripeBillingAddress(address)
      this.props.stripe
        .createToken(stripeBillingAddress)
        .then(({ error, token }) => {
          if (error) {
            this.setState({
              isCommittingMutation: false,
              stripeError: error,
            })
          } else {
            this.createCreditCard({ token: token.id, oneTimeUse: true })
          }
        })
        .catch(e => {
          this.onMutationError(new ErrorWithMetadata(e))
        })
    })
  }

  @track((props, state, args) => {
    const showBillingAddress = !args[0]
    if (showBillingAddress) {
      return {
        action_type: Schema.ActionType.Click,
        subject: Schema.Subject.BNMOUseShippingAddress,
        flow: "buy now",
        type: "checkbox",
      }
    }
  })
  handleChangeHideBillingAddress(hideBillingAddress: boolean) {
    if (!hideBillingAddress) {
      this.setState({
        address: {
          ...emptyAddress,
          country: "US",
        },
      })
    }

    this.setState({ hideBillingAddress })
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        [key]: errors[key],
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
    })
  }

  render() {
    const { order } = this.props
    const {
      stripeError,
      isCommittingMutation,
      address,
      addressErrors,
      addressTouched,
    } = this.state

    const artwork = get(
      this.props,
      props => order.lineItems.edges[0].node.artwork
    )

    return (
      <>
        <Box pb={55}>
          <HorizontalPadding px={[0, 4]}>
            <Row>
              <Col>
                <OrderStepper
                  currentStep="Payment"
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
                  <Join separator={<Spacer mb={3} />}>
                    <Flex flexDirection="column">
                      <Serif
                        mb={1}
                        size="3t"
                        color="black100"
                        lineHeight="1.1em"
                      >
                        Credit card
                      </Serif>
                      <CreditCardInput
                        error={stripeError}
                        onChange={response => {
                          this.setState({ stripeError: response.error })
                        }}
                      />
                    </Flex>

                    {!this.isPickup() && (
                      <Checkbox
                        selected={this.state.hideBillingAddress}
                        onSelect={this.handleChangeHideBillingAddress.bind(
                          this
                        )}
                      >
                        Billing and shipping addresses are the same
                      </Checkbox>
                    )}
                    <Collapse open={this.needsAddress()}>
                      <AddressForm
                        value={address}
                        errors={addressErrors}
                        touched={addressTouched}
                        onChange={this.onAddressChange}
                        billing
                      />
                    </Collapse>

                    <Media greaterThan="xs">
                      <ContinueButton
                        onClick={this.onContinue}
                        loading={isCommittingMutation}
                      />
                    </Media>
                  </Join>
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
                    <>
                      <Spacer mb={3} />
                      <ContinueButton
                        onClick={this.onContinue}
                        loading={isCommittingMutation}
                      />
                      <Spacer mb={2} />
                    </>
                  </Media>
                </Flex>
              }
            />
          </HorizontalPadding>
        </Box>
        <StickyFooter orderType={order.mode} artworkId={artwork.id} />
      </>
    )
  }

  private getStripeBillingAddress(formAddress: Address): stripe.TokenOptions {
    const selectedBillingAddress = (this.needsAddress()
      ? this.state.address
      : this.props.order.requestedFulfillment) as Address
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = selectedBillingAddress
    return {
      name,
      address_line1: addressLine1,
      address_line2: addressLine2,
      address_city: city,
      address_state: region,
      address_zip: postalCode,
      address_country: country,
    }
  }

  private createCreditCard({ token, oneTimeUse }) {
    commitMutation<PaymentRouteCreateCreditCardMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data

          if (creditCardOrError.creditCard) {
            this.setOrderPayment({
              creditCardId: creditCardOrError.creditCard.id,
            })
          } else {
            if (errors) {
              errors.forEach(this.onMutationError.bind(this))
            } else {
              const mutationError = creditCardOrError.mutationError
              this.onMutationError(
                new ErrorWithMetadata(mutationError.message, mutationError),
                mutationError.detail
              )
            }
          }
        },
        onError: this.onMutationError.bind(this),
        mutation: graphql`
          mutation PaymentRouteCreateCreditCardMutation(
            $input: CreditCardInput!
          ) {
            createCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCard {
                    id
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { token, oneTimeUse },
        },
      }
    )
  }

  private setOrderPayment({ creditCardId }) {
    commitMutation<PaymentRouteSetOrderPaymentMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          this.setState({ isCommittingMutation: false })

          const {
            ecommerceSetOrderPayment: { orderOrError },
          } = data

          if (orderOrError.order) {
            this.props.router.push(`/orders/${this.props.order.id}/review`)
          } else {
            if (errors) {
              errors.forEach(this.onMutationError.bind(this))
            } else {
              const orderError = orderOrError.error
              this.onMutationError(
                new ErrorWithMetadata(orderError.code, orderError)
              )
            }
          }
        },
        onError: this.onMutationError.bind(this),
        mutation: graphql`
          mutation PaymentRouteSetOrderPaymentMutation(
            $input: SetOrderPaymentInput!
          ) {
            ecommerceSetOrderPayment(input: $input) {
              orderOrError {
                ... on OrderWithMutationSuccess {
                  order {
                    creditCard {
                      id
                      name
                      street1
                      street2
                      city
                      state
                      country
                      postal_code
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
            creditCardId,
          },
        },
      }
    )
  }

  private onMutationError(error, message?) {
    logger.error(error)
    this.props.dialog.showErrorDialog({ message })
    this.setState({ isCommittingMutation: false })
  }

  private isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

export const PaymentFragmentContainer = createFragmentContainer(
  injectStripe(trackPageViewWrapper(injectDialog(PaymentRoute))),
  graphql`
    fragment Payment_order on Order {
      id
      mode
      creditCard {
        name
        street1
        street2
        city
        state
        country
        postal_code
      }
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
        }
        ... on Pickup {
          fulfillmentType
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
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
    }
  `
)
