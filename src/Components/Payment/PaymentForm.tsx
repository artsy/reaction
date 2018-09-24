import { Button, Box, Flex, Join, Serif, Spacer, Theme } from "@artsy/palette"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import React, { Component } from "react"
import { commitMutation, graphql, RelayProp } from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { Responsive } from "Utils/Responsive"
import {
  AddressForm,
  Address,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"

interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  relayEnvironment?: RelayProp
}

interface PaymentState {
  address: Address
  hideBillingAddress: boolean
  error: stripe.Error
  isComittingMutation: boolean
}

class PaymentForm extends Component<PaymentProps, PaymentState> {
  state = {
    address: { ...emptyAddress, country: "US" },
    hideBillingAddress: true,
    error: null,
    isComittingMutation: false,
  }

  onSubmit = () => {
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

  render() {
    const { error, isComittingMutation } = this.state

    return (
      <Theme>
        <Responsive>
          {({ xs }) => {
            return (
              <Flex flexDirection={xs ? "column" : "row"}>
                <Box width="100%" maxWidth={542}>
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

                    <AddressForm
                      defaultValue={this.state.address}
                      onChange={address => this.setState({ address })}
                      billing
                    />
                    <Button
                      size="large"
                      width="100%"
                      onClick={this.onSubmit}
                      loading={isComittingMutation}
                    >
                      Submit
                    </Button>
                  </Join>
                  <Spacer mb={3} />
                </Box>
              </Flex>
            )
          }}
        </Responsive>
      </Theme>
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
    } = this.state.address

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
    commitMutation(this.props.relayEnvironment, {
      onCompleted: (data, errors) => {
        if (data && data.createCreditCard.creditCardOrError.creditCard) {
          console.log("created cc!")
        } else {
          // TODO: Add error handling
          console.error(errors)
        }
      },
      onError: this.onMutationError.bind(this),
      mutation: graphql`
        mutation PaymentFormCreateCreditCardMutation($input: CreditCardInput!) {
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

  private onMutationError(errors) {
    console.error(errors)
  }
}

export default injectStripe(PaymentForm)
