import { Box, Separator, Serif } from "@artsy/palette"
import { AuctionApp_sale } from "__generated__/AuctionApp_sale.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { ErrorPage } from "Components/ErrorPage"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import {
  Elements,
  ReactStripeElements,
  StripeProvider,
} from "react-stripe-elements"
import { data as sd } from "sharify"
import { WrappedRegistrationForm } from "./Components/RegistrationForm"

interface AuctionAppProps extends ReactStripeElements.InjectedStripeProps {
  sale: AuctionApp_sale
  relay?: RelayProp
}

interface AuctionAppState {
  stripe: stripe.Stripe
}

export class AuctionApp extends Component<AuctionAppProps, AuctionAppState> {
  state: AuctionAppState = { stripe: null }
  CreditCardInput

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(sd.STRIPE_PUBLISHABLE_KEY),
      })
    } else {
      document
        .querySelector("#stripe-js")
        .addEventListener("load", this.setupStripe)
    }
  }

  componentWillUnmount() {
    document
      .querySelector("#stripe-js")
      .removeEventListener("load", this.setupStripe)
  }

  private setupStripe() {
    this.setState({
      stripe: window.Stripe(sd.STRIPE_PUBLISHABLE_KEY),
    })
  }

  render() {
    const { sale } = this.props

    if (!sale) {
      return <ErrorPage code={404} />
    }

    return (
      <AppContainer>
        <Box maxWidth={550} px={[2, 0]} mx="auto" my={[1, 0]}>
          <Serif size="10">Register to Bid on Artsy</Serif>
          <Separator mt={1} mb={2} />
          <Serif size="4" color="black100">
            Please enter your credit card information below. The name on your
            Artsy account must match the name on the card, and a valid credit
            card is required in order to bid.
          </Serif>
          <Serif size="4" mt={2} color="black100">
            Registration is free. Artsy will never charge this card without your
            permission, and you are not required to use this card to pay if you
            win.
          </Serif>
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Box mt={2}>
                <WrappedRegistrationForm sale={sale} relay={this.props.relay} />
              </Box>
            </Elements>
          </StripeProvider>
        </Box>
      </AppContainer>
    )
  }
}

export const AuctionAppFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(AuctionApp),
  {
    sale: graphql`
      fragment AuctionApp_sale on Sale {
        id
      }
    `,
  }
)
