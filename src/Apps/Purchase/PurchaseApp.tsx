import { Box } from "@artsy/palette"
import { PurchaseApp_orders } from "__generated__/PurchaseApp_orders.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { Mediator, SystemContextConsumer } from "Artsy"
import { RouterState, withRouter } from "found"
import React from "react"
import { Meta, Title } from "react-head"
import { graphql } from "react-relay"
import { Elements } from "react-stripe-elements"
import styled from "styled-components"

export interface PurchaseAppProps extends RouterState {
  orders: PurchaseApp_orders
}

class PurchaseApp extends React.Component<PurchaseAppProps, {}> {
  render() {
    console.log(this.props)

    const { orders } = this.props

    console.log("ORDERS", orders)

    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        />
        <SafeAreaContainer>
          <>HELLO WORLD</>
        </SafeAreaContainer>
      </AppContainer>
    )
  }
}

const PurchaseAppWithRouter = withRouter(PurchaseApp)

export { PurchaseAppWithRouter as PurchaseApp }

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
