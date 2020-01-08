import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { ComponentClass, StatelessComponent } from "react"
import { PurchaseApp } from "./PurchaseApp"

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    Component: PurchaseApp,
    query: graphql`
      query routes_PurchaseQuery(
        $buyerId: String!
        $buyerType: String
        $first: Int!
      ) {
        commerceOrders(
          buyerId: $buyerId
          buyerType: $buyerType
          first: $first
        ) {
          ...PurchaseApp_orders
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
    prepareVariables: (params, props) => {
      return {
        buyerId: "5b97dd5de437cf2b7abbfd24",
        buyerType: "user",
        first: 20,
      }
    },
  },
]
