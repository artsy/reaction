import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { PurchaseAppFragmentContainer as PurchaseApp } from "./PurchaseApp"

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    Component: PurchaseApp,
    query: graphql`
      query routes_PurchaseQuery($first: Int!) {
        orders: commerceMyOrders(first: $first) {
          ...PurchaseApp_orders
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 20,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]

// prepareVariables: (params, props) => {
//   return {
//     buyerId: "5b97dd5de437cf2b7abbfd24",
//     buyerType: "user",
//     first: 20,
//   }
// },
