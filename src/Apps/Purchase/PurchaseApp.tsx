import { Box } from "@artsy/palette"
import { OrderApp_order } from "__generated__/OrderApp_order.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { Mediator, SystemContextConsumer } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import { Match, RouterState, withRouter } from "found"
import React from "react"
import { Meta, Title } from "react-head"
import { graphql } from "react-relay"
import { Elements, StripeProvider } from "react-stripe-elements"
import styled from "styled-components"
import { get } from "Utils/get"
import { ConnectedModalDialog } from "./Dialogs"

declare global {
  interface Window {
    sd: {
      CURRENT_USER: {
        id: string
      }
    }
  }
}

const findCurrentRoute = ({ routes, routeIndices }: Match) => {
  let currentRoute = routes[routeIndices[0]]
  routeIndices.slice(1).forEach(routeIndex => {
    currentRoute = currentRoute.children[routeIndex]
  })
  return currentRoute
}

export interface PurchaseAppProps extends RouterState {
  orders: PurchaseApp_orders
}

class PurchaseApp extends React.Component<{}, {}> {
  mediator: Mediator | null = null

  render() {
    const { children, order } = this.props
    let artworkId

    if (!order) {
      return <ErrorPage code={404} />
    } else {
      artworkId = get(
        this.props,
        props => order.lineItems.edges[0].node.artwork.slug
      )
    }

    return (
      <SystemContextConsumer>
        {({ isEigen, mediator }) => {
          this.mediator = mediator
          return (
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
                <StripeProvider stripe={this.state.stripe}>
                  <Elements>
                    <>{children}</>
                  </Elements>
                </StripeProvider>
              </SafeAreaContainer>
              <StickyFooter orderType={order.mode} artworkId={artworkId} />
              <ConnectedModalDialog />
            </AppContainer>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

const OrderAppWithRouter = withRouter(OrderApp)

export { OrderAppWithRouter as OrderApp }

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 75px;
`

graphql`
  fragment PurchaseApp_orders on CommerceOrderConnectionWithTotalCount {
    edges {
      node {
        internalID
        state
        buyerTotal
        lineItems {
          edges {
            node {
              artwork {
                image {
                  url
                }
                internalID
                title
                artist {
                  name
                }
                partner {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
