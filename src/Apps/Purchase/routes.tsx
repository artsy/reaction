import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { PurchaseAppFragmentContainer as PurchaseApp } from "./PurchaseApp"

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    Component: PurchaseApp,
    query: graphql`
      query routes_PurchaseQuery(
        $first: Int!
        $last: Int
        $after: String
        $before: String
      ) {
        orders: commerceMyOrders(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          ...PurchaseApp_orders
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 5,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
