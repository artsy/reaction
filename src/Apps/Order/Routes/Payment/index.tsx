import { Button, Checkbox, Flex, Join, Serif, Spacer } from "@artsy/palette"
import { Payment_order } from "__generated__/Payment_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { validatePresence } from "Apps/Order/Components/Validators"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressField,
  AddressForm,
  emptyAddress,
} from "../../Components/AddressForm"

import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayRefetchProp,
} from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { Collapse } from "Styleguide"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  relay?: RelayRefetchProp
  router: Router
}

interface PaymentState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  stripeError: stripe.Error
  isComittingMutation: boolean
}

export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state = {
    hideBillingAddress: true,
    stripeError: null,
    isComittingMutation: false,
    address: this.startingAddress,
    addressErrors: {},
  }

  get startingAddress(): Address {
    return {
      ...emptyAddress,
      country: "US",
    }
  }

  onContinue: () => void = () => {
    // console.log("onContinue")

    if (this.needsAddress()) {
      const errors = this.validateAddress(this.state.address)

      // console.log("onContinue", "needsAddress", this.state.address)

      if (Object.keys(errors).filter(key => errors[key]).length > 0) {
        // console.log("onContinue", "needsAddress", "error", errors)
        this.setState({ addressErrors: errors })
        return
      }
    }

    // console.log("onContinue", "valid")

    const { address } = this.state
    const stripeBillingAddress = this.getStripeBillingAddress(address)
    this.props.stripe
      .createToken(stripeBillingAddress)
      .then(({ error, token }) => {
        if (error) {
          this.setState({
            isComittingMutation: false,
            stripeError: error,
          })
        } else {
          this.createCreditCard({ token: token.id }, () =>
            this.setState({
              isComittingMutation: false,
            })
          )
        }
      })
  }

  private validateAddress(address: Address) {
    const { name, addressLine1, city, region, country, postalCode } = address
    return {
      name: validatePresence(name),
      addressLine1: validatePresence(addressLine1),
      city: validatePresence(city),
      region: validatePresence(region),
      country: validatePresence(country),
      postalCode: validatePresence(postalCode),
    }
  }

  handleChangeHideBillingAddress = (hideBillingAddress: boolean) => {
    this.setState({ hideBillingAddress })
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
    const {
      stripeError,
      isComittingMutation,
      address,
      addressErrors,
    } = this.state

    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"payment"} />
          </Col>
        </Row>

        <Spacer mb={3} />
        <Responsive>
          {({ xs }) => (
            <TwoColumnLayout
              Content={
                <>
                  <Join separator={<Spacer mb={3} />}>
                    <Flex flexDirection="column">
                      <Serif mb={1} size="3t" color="black100" lineHeight={18}>
                        Credit Card
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
                        onSelect={this.handleChangeHideBillingAddress}
                      >
                        Billing and shipping addresses are the same
                      </Checkbox>
                    )}
                    <Collapse
                      open={this.isPickup() || this.state.hideBillingAddress}
                    >
                      <AddressForm
                        defaultValue={address}
                        errors={addressErrors}
                        onChange={this.onAddressChange}
                        billing
                      />
                    </Collapse>
                    {!xs && (
                      <ContinueButton
                        onClick={this.onContinue}
                        loading={isComittingMutation}
                      />
                    )}
                  </Join>
                  <Spacer mb={3} />
                </>
              }
              Sidebar={
                <Flex flexDirection="column">
                  <TransactionSummary order={order} mb={[2, 3]} />
                  <Helper
                    artworkId={order.lineItems.edges[0].node.artwork.id}
                  />
                  {xs && (
                    <>
                      <Spacer mb={3} />
                      <ContinueButton
                        onClick={this.onContinue}
                        loading={isComittingMutation}
                      />
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

  // Infer the billing address from the form or shipping address (maybe not needed)
  private getSelectedBillingAddress(formAddress: Address): Address {
    return (this.needsAddress()
      ? this.state.address
      : this.props.order.requestedFulfillment) as Address
  }

  // Smoosh the billing address into stripe-friendly camel case.
  private getStripeBillingAddress(formAddress: Address): stripe.TokenOptions {
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = this.getSelectedBillingAddress(formAddress)
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

  private createCreditCard({ token }, setNotSubmitting: () => void) {
    commitMutation(this.props.relay.environment, {
      onCompleted: (data, errors) => {
        if (data && data.createCreditCard.creditCardOrError.creditCard) {
          this.setOrderPayment(
            {
              creditCardId:
                data.createCreditCard.creditCardOrError.creditCard.id,
            },
            setNotSubmitting
          )
        } else {
          setNotSubmitting()
          // TODO: Add error handling
          console.error(errors)
        }
      },
      onError: (error?: Error) => {
        setNotSubmitting()
        this.onMutationError.bind(this)(error)
      },
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
        input: { token },
      },
    })
  }

  private setOrderPayment({ creditCardId }, setNotSubmitting: () => void) {
    commitMutation(this.props.relay.environment, {
      onCompleted: (data, errors) => {
        setNotSubmitting()
        if (data && data.setOrderPayment.orderOrError.order) {
          this.props.router.push(`/order2/${this.props.order.id}/review`)
        } else {
          // TODO: Add error handling
          console.error(errors)
        }
      },
      onError: (error?: Error) => {
        setNotSubmitting()
        this.onMutationError.bind(this)(error)
      },
      mutation: graphql`
        mutation PaymentRouteSetOrderPaymentMutation(
          $input: SetOrderPaymentInput!
        ) {
          setOrderPayment(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  id
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
    })
  }

  private onMutationError(errors) {
    console.error(errors)
  }

  isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
  }

  needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

export const PaymentFragmentContainer = createFragmentContainer(
  injectStripe(PaymentRoute),
  graphql`
    fragment Payment_order on Order {
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
