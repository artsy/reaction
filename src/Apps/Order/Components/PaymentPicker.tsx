import { PaymentPicker_me } from "__generated__/PaymentPicker_me.graphql"
import { PaymentPicker_order } from "__generated__/PaymentPicker_order.graphql"
import { PaymentPickerCreateCreditCardMutation } from "__generated__/PaymentPickerCreateCreditCardMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"

import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { validateAddress } from "Apps/Order/Utils/formValidators"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"

import {
  BorderedRadio,
  Checkbox,
  Collapse,
  Flex,
  Link,
  RadioGroup,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import { CreditCardDetails } from "./CreditCardDetails"

export interface PaymentPickerProps
  extends ReactStripeElements.InjectedStripeProps {
  order: PaymentPicker_order
  me: PaymentPicker_me
  commitMutation: CommitMutation
  innerRef: React.RefObject<PaymentPicker>
}

interface PaymentPickerState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCreatingStripeToken: boolean
  creditCardSelection: { type: "existing"; id: string } | { type: "new" }
  saveNewCreditCard: boolean
}

export class PaymentPicker extends React.Component<
  PaymentPickerProps,
  PaymentPickerState
> {
  state = {
    hideBillingAddress: true,
    stripeError: null,
    isCreatingStripeToken: false,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
    creditCardSelection: this.getInitialCreditCardSelection(),
    saveNewCreditCard: true,
  }

  private getInitialCreditCardSelection(): PaymentPickerState["creditCardSelection"] {
    return this.props.me.creditCards.edges.length
      ? { type: "existing", id: this.props.me.creditCards.edges[0].node.id }
      : { type: "new" }
  }

  private startingAddress(): Address {
    return {
      ...emptyAddress,
      country: "US",
    }
  }

  private get touchedAddress() {
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

  private createStripeToken = async () => {
    try {
      this.setState({ isCreatingStripeToken: true })
      const stripeBillingAddress = this.getStripeBillingAddress()
      return await this.props.stripe.createToken(stripeBillingAddress)
    } finally {
      this.setState({ isCreatingStripeToken: false })
    }
  }

  getCreditCardId: () => Promise<
    | { type: "error"; error: string | undefined }
    | { type: "invalid_form" }
    | { type: "success"; creditCardId: string }
  > = async () => {
    const { creditCardSelection, saveNewCreditCard } = this.state
    if (creditCardSelection.type === "existing") {
      return { type: "success", creditCardId: creditCardSelection.id }
    }

    if (this.needsAddress()) {
      const { errors, hasErrors } = validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return { type: "invalid_form" }
      }
    }

    const stripeResult = await this.createStripeToken()
    if (stripeResult.error) {
      this.setState({
        stripeError: stripeResult.error,
      })
      return { type: "invalid_form" }
    }

    const creditCardOrError = (await this.createCreditCard({
      input: {
        token: stripeResult.token.id,
        oneTimeUse: !saveNewCreditCard,
      },
    })).createCreditCard.creditCardOrError

    if (creditCardOrError.mutationError) {
      return { type: "error", error: creditCardOrError.mutationError.detail }
    }
    return { type: "success", creditCardId: creditCardOrError.creditCard.id }
  }

  @track((props: PaymentPickerProps, state, args) => {
    const showBillingAddress = !args[0]
    if (showBillingAddress && props.order.state === "PENDING") {
      return {
        action_type: Schema.ActionType.Click,
        subject: Schema.Subject.BNMOUseShippingAddress,
        flow: "buy now",
        type: "checkbox",
      }
    }
  })
  private handleChangeHideBillingAddress(hideBillingAddress: boolean) {
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

  private onAddressChange: AddressChangeHandler = (address, key) => {
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
    const {
      stripeError,
      address,
      addressErrors,
      addressTouched,
      creditCardSelection,
    } = this.state
    const {
      me: { creditCards },
    } = this.props

    const userHasExistingCards = creditCards.edges.length > 0

    return (
      <>
        {userHasExistingCards && (
          <>
            <RadioGroup
              onSelect={val => {
                if (val === "new") {
                  this.setState({ creditCardSelection: { type: "new" } })
                } else {
                  this.setState({
                    creditCardSelection: { type: "existing", id: val },
                  })
                }
              }}
              defaultValue={
                creditCardSelection.type === "new"
                  ? "new"
                  : creditCardSelection.id
              }
            >
              {creditCards.edges
                .map(e => {
                  const { id, ...creditCardProps } = e.node
                  return (
                    <BorderedRadio value={id} key={id}>
                      <CreditCardDetails {...creditCardProps} />
                    </BorderedRadio>
                  )
                })
                .concat([
                  <BorderedRadio
                    value="new"
                    key="new"
                    selected={creditCardSelection.type === "new"}
                  >
                    Add another card.
                  </BorderedRadio>,
                ])}
            </RadioGroup>
            <Spacer mb={1} />
            <Sans size="2">
              <Link href="/user/payments" target="_blank">
                Manage cards
              </Link>
            </Sans>
          </>
        )}

        <Collapse open={this.state.creditCardSelection.type === "new"}>
          {userHasExistingCards && <Spacer mb={3} />}
          <Flex flexDirection="column">
            <Serif mb={1} size="3t" color="black100" lineHeight="1.1em">
              Credit card
            </Serif>
            <CreditCardInput
              error={stripeError}
              onChange={response => {
                this.setState({ stripeError: response.error })
              }}
            />

            {!this.isPickup() && (
              <>
                <Spacer mb={2} />
                <Checkbox
                  selected={this.state.hideBillingAddress}
                  onSelect={this.handleChangeHideBillingAddress.bind(this)}
                >
                  Billing and shipping addresses are the same.
                </Checkbox>
              </>
            )}
            <Collapse open={this.needsAddress()}>
              <Spacer mb={2} />
              <AddressForm
                value={address}
                errors={addressErrors}
                touched={addressTouched}
                onChange={this.onAddressChange}
                billing
              />
              <Spacer mb={2} />
            </Collapse>
            <Checkbox
              selected={this.state.saveNewCreditCard}
              onSelect={() =>
                this.setState({
                  saveNewCreditCard: !this.state.saveNewCreditCard,
                })
              }
            >
              Save credit card for later use.
            </Checkbox>
          </Flex>
        </Collapse>
      </>
    )
  }

  private getStripeBillingAddress(): stripe.TokenOptions {
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

  private createCreditCard(
    variables: PaymentPickerCreateCreditCardMutation["variables"]
  ) {
    return this.props.commitMutation<PaymentPickerCreateCreditCardMutation>({
      variables,
      mutation: graphql`
        mutation PaymentPickerCreateCreditCardMutation(
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
    })
  }

  private isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

// Our mess of HOC wrappers is not amenable to ref forwarding, so to expose a
// ref to the PaymentPicker instance (for getCreditCardId) we'll add an
// `innerRef` prop which gets sneakily injected here
const PaymentPickerWithInnerRef: React.SFC<
  PaymentPickerProps & { innerRef: React.RefObject<PaymentPicker> }
> = ({ innerRef, ...props }) => (
  <PaymentPicker ref={innerRef} {...props as any} />
)

export const PaymentPickerFragmentContainer = createFragmentContainer(
  // 😭 HOCs
  injectStripe(track()(PaymentPickerWithInnerRef)),
  {
    me: graphql`
      fragment PaymentPicker_me on Me {
        creditCards {
          edges {
            node {
              id
              brand
              last_digits
              expiration_month
              expiration_year
            }
          }
        }
      }
    `,
    order: graphql`
      fragment PaymentPicker_order on Order {
        id
        mode
        state
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
      }
    `,
  }
)
