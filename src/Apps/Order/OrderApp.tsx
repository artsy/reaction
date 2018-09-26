import { routes_OrderQueryResponse } from "__generated__/routes_OrderQuery.graphql"
import { ContextConsumer } from "Artsy/SystemContext"
import { Location, RouteConfig, Router } from "found"
import React from "react"
import { Meta, Title } from "react-head"
import { Elements, StripeProvider } from "react-stripe-elements"

declare global {
  interface Window {
    Stripe?: (key: string) => stripe.Stripe
    sd: {
      STRIPE_PUBLISHABLE_KEY: string
    }
  }
}

const findRoute = (routes, routeIndices) => {
  let currentRoute = routes[routeIndices[0]]
  routeIndices.slice(1).forEach(routeIndex => {
    currentRoute = currentRoute.children[routeIndex]
  })
  return currentRoute
}

export interface OrderAppProps extends routes_OrderQueryResponse {
  params: {
    orderID: string
  }
  location: Location
  routeIndices: number[]
  routes: RouteConfig[]
  router: Router
}

interface OrderAppState {
  stripe: stripe.Stripe
}

export class OrderApp extends React.Component<OrderAppProps, OrderAppState> {
  state = { stripe: null }
  removeTransitionHook: () => void

  componentDidMount() {
    if (!this.removeTransitionHook) {
      this.removeTransitionHook = this.props.router.addTransitionHook(
        this.onTransition
      )
    }

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

  componentWillUnmount() {
    if (this.removeTransitionHook) {
      this.removeTransitionHook()
    }
  }

  onTransition = newLocation => {
    const { routes, routeIndices, location: oldLocation, router } = this.props
    const route = findRoute(routes, routeIndices)

    if (route.onTransition) {
      return route.onTransition(newLocation, oldLocation, router)
    }

    return true
  }

  render() {
    const { children, location, router, order, params } = this.props

    if (
      order &&
      order.state !== "PENDING" &&
      !location.pathname.includes("status")
    ) {
      router.replace(`/order2/${params.orderID}/status`)
    }
    return (
      <ContextConsumer>
        {({ isEigen }) => (
          <>
            <Title>Checkout | Artsy</Title>
            {isEigen ? (
              <Meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              />
            ) : null}
            <StripeProvider stripe={this.state.stripe}>
              <Elements>{children}</Elements>
            </StripeProvider>
          </>
        )}
      </ContextConsumer>
    )
  }
}
