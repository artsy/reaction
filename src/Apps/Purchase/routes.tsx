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
        $sellerId: String
        $state: CommerceOrderStateEnum
        $mode: CommerceOrderModeEnum
        $sort: CommerceOrderConnectionSortEnum
        $first: Int!
      ) {
        commerceMyOrders(
          sellerId: $sellerId
          state: $state
          mode: $mode
          sort: $sort
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
