import { Box } from "@artsy/palette"
import { routes_OrderQueryResponse } from "__generated__/routes_OrderQuery.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { ContextConsumer } from "Artsy/SystemContext"
import { ErrorPage } from "Components/ErrorPage"
import { Location, RouteConfig, Router } from "found"
import React from "react"
import { Meta, Title } from "react-head"
import { Elements, StripeProvider } from "react-stripe-elements"
import styled from "styled-components"
import { get } from "Utils/get"
import { ConnectedModalDialog } from "./Dialogs"
import { ProvideMutationContext } from "./Utils/commitMutation"

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
    const { children, order } = this.props
    let artworkId

    if (!order) {
      return <ErrorPage code={404} />
    } else {
      artworkId = get(
        this.props,
        props => order.lineItems.edges[0].node.artwork.id
      )
    }

    return (
      <ContextConsumer>
        {({ isEigen }) => (
          <AppContainer>
            <Title>Checkout | Artsy</Title>
            {isEigen ? (
              <Meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              />
            ) : (
              <Meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
              />
            )}
            <SafeAreaContainer>
              <ProvideMutationContext>
                <StripeProvider stripe={this.state.stripe}>
                  <Elements>
                    <>{children}</>
                  </Elements>
                </StripeProvider>
              </ProvideMutationContext>
            </SafeAreaContainer>
            <StickyFooter orderType={order.mode} artworkId={artworkId} />
            <ConnectedModalDialog />
          </AppContainer>
        )}
      </ContextConsumer>
    )
  }
}

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 75px;
`
