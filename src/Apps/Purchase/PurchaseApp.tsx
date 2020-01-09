import { Box } from "@artsy/palette"
import { PurchaseApp_orders } from "__generated__/PurchaseApp_orders.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export interface Props {
  orders: PurchaseApp_orders
}

export class PurchaseApp extends React.Component<Props, {}> {
  render() {
    console.log(this.props)

    const { orders } = this.props
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        />
        <SafeAreaContainer>
          {orders.edges
            .map(x => x.node)
            .map(order => (
              <> {order.state} </>
            ))}
        </SafeAreaContainer>
      </AppContainer>
    )
  }
}

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 75px;
`

export const PurchaseAppFragmentContainer = createFragmentContainer(
  PurchaseApp,
  {
    orders: graphql`
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
    `,
  }
)
