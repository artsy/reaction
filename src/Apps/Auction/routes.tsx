import { RouteConfig } from "found"
import { graphql } from "react-relay"
import { AuctionAppFragmentContainer } from "./AuctionApp"

export const routes: RouteConfig[] = [
  {
    path: "/auction-registration2/:saleID",
    Component: AuctionAppFragmentContainer,
    query: graphql`
      query routes_AuctionQuery($saleID: String!) {
        sale: sale(id: $saleID) {
          ...AuctionApp_sale
        }
      }
    `,
  },
]
