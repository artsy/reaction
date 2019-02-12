import { Payment_order } from "__generated__/Payment_order.graphql"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayRefetchProp,
} from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"

import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"

import { Dialog, injectDialog } from "Apps/Order/Dialogs"

export interface NewPaymentProps
  extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  relay?: RelayRefetchProp
  router: Router
  dialog: Dialog
}

interface NewPaymentState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCommittingMutation: boolean
}

export class NewPaymentRoute extends Component<
  NewPaymentProps,
  NewPaymentState
> {
  render() {
    return <div>HELLO!!!!!</div>
  }
}

export const NewPaymentFragmentContainer = createFragmentContainer(
  injectStripe(trackPageViewWrapper(injectDialog(NewPaymentRoute))),
  graphql`
    fragment NewPayment_order on Order {
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
