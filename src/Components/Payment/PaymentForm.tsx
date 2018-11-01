import { Box, Button, Flex, Join, Serif, Spacer, Theme } from "@artsy/palette"
import { PaymentFormCreateCreditCardMutation } from "__generated__/PaymentFormCreateCreditCardMutation.graphql"
import {
  Address,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { validatePresence } from "Apps/Order/Components/Validators"
import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { Component } from "react"
import { commitMutation, graphql, RelayProp } from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { ConnectionHandler } from "relay-runtime"
import { Responsive } from "Utils/Responsive"

export interface PaymentFormProps
  extends ReactStripeElements.InjectedStripeProps {
  relay?: RelayProp
  me: any
}

interface PaymentFormState {
  address: Address
  hideBillingAddress: boolean
  error: stripe.Error
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
  addressErrors: AddressErrors
  addressTouched: AddressTouched
}

class PaymentForm extends Component<PaymentFormProps, PaymentFormState> {
  state = {
    address: { ...emptyAddress, country: "US" },
    hideBillingAddress: true,
    error: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
    addressErrors: {},
    addressTouched: {},
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

  onSubmit = () => {
    const billingAddress = this.getSelectedBillingAddress()
    const { me } = this.props
    this.setState({ isCommittingMutation: true }, () => {
      const errors = this.validateAddress(this.state.address)
      if (Object.keys(errors).filter(key => errors[key]).length > 0) {
        this.setState({
          isCommittingMutation: false,
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return
      }

      this.props.stripe.createToken(billingAddress).then(({ error, token }) => {
        if (error) {
          this.setState({
            error,
            isCommittingMutation: false,
          })
        } else {
          this.createCreditCard({ token: token.id, me })
        }
      })
    })
  }

  render() {
    const { error, isCommittingMutation } = this.state

    return (
      <Theme>
        <>
          <Responsive>
            {({ xs }) => {
              return (
                <Flex flexDirection={xs ? "column" : "row"}>
                  <Box width="100%" maxWidth={542}>
                    <Join separator={<Spacer mb={3} />}>
                      <Flex flexDirection="column">
                        <Serif
                          mb={1}
                          size="3t"
                          color="black100"
                          lineHeight={18}
                        >
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
                        value={this.state.address}
                        onChange={address => this.setState({ address })}
                        errors={this.state.addressErrors}
                        touched={this.state.addressTouched}
                        billing
                      />
                      <Button
                        size="large"
                        width="100%"
                        onClick={this.onSubmit}
                        loading={isCommittingMutation}
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
          <ErrorModal
            onClose={this.onCloseModal}
            show={this.state.isErrorModalOpen}
            contactEmail="support@artsy.net"
            detailText={this.state.errorModalMessage}
          />
        </>
      </Theme>
    )
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  private validateAddress(address: Address) {
    const { name, addressLine1, city, region, country, postalCode } = address
    const usOrCanada = country === "US" || country === "CA"
    return {
      name: validatePresence(name),
      addressLine1: validatePresence(addressLine1),
      city: validatePresence(city),
      region: usOrCanada && validatePresence(region),
      country: validatePresence(country),
      postalCode: usOrCanada && validatePresence(postalCode),
    }
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

  onCreditCardAdded(me, store, data): void {
    // const creditCard = store
    //   .getRootField("createCreditCard")
    //   .getLinkedRecord("creditCardOrError")
    // const currentMe = store.get(me.__id)
    const newCreditCard = store.getRootField("createCreditCard")
    // const deletedId = deletePostField.getValue("deletedId")
    const viewerProxy = store.get(me.__id)
    const connection = ConnectionHandler.getConnection(
      viewerProxy,
      "CreditCards_connection"
    )
    // .getLinkedRecords("creditCards")
    // debugger
    // const newCreditCards = [...currentCreditCards, creditCard]
    // const suggestedGene = store.get(
    //   data.followGene.gene.similar.edges[0].node.__id
    // )
    // this.excludedGeneIds.add(suggestedGene.getValue("_id"))

    // const suggestedGenesRootField = store.get("client:root")
    // const suggestedGenes = suggestedGenesRootField.getLinkedRecords(
    //   "suggested_genes"
    // )
    // const updatedSuggestedGenes = suggestedGenes.map(
    //   geneItem =>
    //     geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    // )

    // suggestedGenesRootField.setLinkedRecords(
    //   updatedSuggestedGenes,
    //   "suggested_genes"
    // )
  }

  private createCreditCard({ token, me }) {
    commitMutation<PaymentFormCreateCreditCardMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data

          if (creditCardOrError.creditCard) {
            this.setState({ isCommittingMutation: false })
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
          mutation PaymentFormCreateCreditCardMutation(
            $input: CreditCardInput!
          ) {
            createCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCard {
                    id
                    brand
                    last_digits
                    expiration_year
                    expiration_month
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
        updater: (store, data) => this.onCreditCardAdded(me, store, data),
      }
    )
  }

  private onMutationError(errors, errorModalMessage?) {
    console.error("PaymentForm.tsx", errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalMessage,
    })
  }
}

export default injectStripe(PaymentForm)
