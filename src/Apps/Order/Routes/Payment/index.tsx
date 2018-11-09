import { Button, Checkbox, Flex, Join, Serif, Spacer } from "@artsy/palette"
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

import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { Helper } from "Apps/Order/Components/Helper"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { validateAddress } from "Apps/Order/Utils/formValidators"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayRefetchProp,
} from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { Collapse } from "Styleguide/Components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  mediator: Mediator
  order: Payment_order
  relay?: RelayRefetchProp
  router: Router
}

interface PaymentState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
}

const logger = createLogger("Order/Routes/Payment/index.tsx")

@track()
export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state = {
    hideBillingAddress: true,
    stripeError: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
  }

  componentDidMount() {
    this.props.mediator.trigger("order:payment")
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

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
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

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Payment"
                offerFlow={order.mode === "OFFER"}
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
                    <Serif mb={1} size="3t" color="black100" lineHeight={18}>
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
                      onSelect={this.handleChangeHideBillingAddress.bind(this)}
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
                <Spacer mb={3} />
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <TransactionSummary order={order} mb={[2, 3]} />
                <Helper artworkId={order.lineItems.edges[0].node.artwork.id} />
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
                    <ContinueButton
                      onClick={this.onContinue}
                      loading={isCommittingMutation}
                    />
                  </>
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
        />
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
            this.onMutationError(
              errors || creditCardOrError.mutationError,
              creditCardOrError.mutationError &&
                creditCardOrError.mutationError.detail
            )
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
            this.onMutationError(errors || orderOrError)
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

  private onMutationError(errors, errorModalMessage?) {
    logger.error(errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalMessage,
    })
  }

  private isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

const PaymentRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <PaymentRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const PaymentFragmentContainer = createFragmentContainer(
  injectStripe(PaymentRouteWrapper),
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
      ...TransactionSummary_order
    }
  `
)
