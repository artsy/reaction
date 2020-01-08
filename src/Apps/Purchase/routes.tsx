import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

export const routes = [
  {
    path: "/user/purchases",
    Component: ArtworkApp,
    query: graphql`
      query routes_PurchaseQuery(
        $buyerId: String!
        $buyerType: String
        $first: Integer!
      ) {
        commerceOrders(
          buyerId: $buyerId
          buyerType: $buyerType
          first: $first
        ) {
          ...ArtworkApp_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
