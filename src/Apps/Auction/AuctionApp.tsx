import { Box, Sans, Separator, Serif } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import { ErrorPage } from "Components/ErrorPage"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Elements,
  ReactStripeElements,
  StripeProvider,
} from "react-stripe-elements"
import RegistrationForm from "./Components/RegistrationForm"

declare global {
  interface Window {
    Stripe?: (key: string) => stripe.Stripe
    sd: {
      STRIPE_PUBLISHABLE_KEY: string
    }
  }
}

interface AuctionAppProps extends ReactStripeElements.InjectedStripeProps {
  sale: any
  me: any
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface AuctionAppState {
  isGettingCreditCardId: boolean
  stripe: stripe.Stripe
}

export class AuctionApp extends Component<AuctionAppProps, AuctionAppState> {
  state: AuctionAppState = { isGettingCreditCardId: false, stripe: null }
  CreditCardInput
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(window.sd.STRIPE_PUBLISHABLE_KEY),
      })
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(window.sd.STRIPE_PUBLISHABLE_KEY),
        })
      })
    }
  }

  render() {
    const { sale } = this.props
    // const { isGettingCreditCardId } = this.state

    if (!sale) {
      return <ErrorPage code={404} />
    }

    return (
      <AppContainer>
        <Box maxWidth={550} m="0 auto">
          <Serif size="10">Register to Bid on Artsy</Serif>
          <Separator mt={1} mb={2} />
          <Sans size="4t" color="black60">
            Please enter your credit card information below. The name on your
            Artsy account must match the name on the card, and a valid credit
            card is required in order to bid.
          </Sans>
          <Sans size="4t" mt={2} color="black60">
            Registration is free. Artsy will never charge this card without your
            permission, and you are not required to use this card to pay if you
            win.
          </Sans>
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Box mt={2}>
                <RegistrationForm />
              </Box>
            </Elements>
          </StripeProvider>
        </Box>
      </AppContainer>
    )
  }
}

export const PaymentFragmentContainer = createFragmentContainer(AuctionApp, {
  me: graphql`
    fragment AuctionApp_me on Me {
      name
    }
  `,
  sale: graphql`
    fragment AuctionApp_sale on Sale {
      id
    }
  `,
})
