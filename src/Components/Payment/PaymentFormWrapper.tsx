import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import PaymentForm from "./PaymentForm"

declare global {
  interface Window {
    Stripe?: (key: string) => stripe.Stripe
    sd: {
      STRIPE_PUBLISHABLE_KEY: string
    }
  }
}

interface PaymentFormState {
  stripe: stripe.Stripe
}

export class PaymentFormWrapper extends React.Component<{}, PaymentFormState> {
  state = { stripe: null }

  constructor(props) {
    super(props)
  }

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
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements hidePostalCode={true}>
          <PaymentForm />
        </Elements>
      </StripeProvider>
    )
  }
}
