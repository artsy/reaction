import { Button, Checkbox, Flex, Join, Serif, Spacer } from "@artsy/palette"
import { Payment_order } from "__generated__/Payment_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
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
import { Collapse } from "Styleguide/Components/Collapse"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"
import {
  Address,
  AddressForm,
  emptyAddress,
} from "../../Components/AddressForm"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  relay?: RelayRefetchProp
  router: Router
}

interface PaymentState {
  address: Address
  hideBillingAddress: boolean
  error: stripe.Error
  isComittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
}

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state = {
    address: {
      ...emptyAddress,
      country: "US",
    },
    hideBillingAddress: true,
    error: null,
    isComittingMutation: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
  }

  onContinueButtonPressed = () => {
    const billingAddress = this.getSelectedBillingAddress()

    this.setState({ isComittingMutation: true }, () => {
      this.props.stripe.createToken(billingAddress).then(({ error, token }) => {
        if (error) {
          this.setState({
            error,
            isComittingMutation: false,
          })
        } else {
          this.createCreditCard({ token: token.id })
        }
      })
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  render() {
    const { order } = this.props
    const { error, isComittingMutation } = this.state

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
                        error={error}
                        onChange={response =>
                          this.setState({ error: response.error })
                        }
                      />
                    </Flex>

                    {!this.isPickup() && (
                      <Checkbox
                        selected={this.state.hideBillingAddress}
                        onSelect={hideBillingAddress =>
                          this.setState({ hideBillingAddress })
                        }
                      >
                        Billing and shipping addresses are the same
                      </Checkbox>
                    )}
                    <Collapse
                      open={this.isPickup() || !this.state.hideBillingAddress}
                    >
                      <AddressForm
                        defaultValue={this.state.address}
                        onChange={address => this.setState({ address })}
                        billing
                      />
                    </Collapse>
                    {!xs && (
                      <ContinueButton
                        onClick={this.onContinueButtonPressed}
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
                        onClick={this.onContinueButtonPressed}
                        loading={isComittingMutation}
                      />
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
          detailText={this.state.errorModalMessage}
        />
      </>
    )
  }

  private getSelectedBillingAddress(): stripe.TokenOptions {
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = (this.isPickup() || !this.state.hideBillingAddress
      ? this.state.address
      : this.props.order.requestedFulfillment) as Address

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

  private createCreditCard({ token }) {
    commitMutation(this.props.relay.environment, {
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
              creditCardOrError.mutationError.message
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
        input: { token },
      },
    })
  }

  private setOrderPayment({ creditCardId }) {
    commitMutation(this.props.relay.environment, {
      onCompleted: (data, errors) => {
        this.setState({ isComittingMutation: false })

        const {
          setOrderPayment: { orderOrError },
        } = data

        if (orderOrError.order) {
          this.props.router.push(`/order2/${this.props.order.id}/review`)
        } else {
          this.onMutationError(errors || orderOrError)
        }
      },
      onError: this.onMutationError.bind(this),
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

  private onMutationError(errors, errorModalMessage?) {
    console.error("Order/Routes/Payment/index.tsx", errors)
    this.setState({
      isComittingMutation: false,
      isErrorModalOpen: true,
      errorModalMessage,
    })
  }

  private isPickup() {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
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
