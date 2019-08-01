import { routes_AuctionQueryResponse } from "__generated__/routes_AuctionQuery.graphql"
import { RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import createLogger from "Utils/logger"
import { AuctionAppFragmentContainer } from "./AuctionApp"

const logger = createLogger("Apps/Auction/routes")

interface Redirect {
  path: string
  reason: string
}

function isRegisterable(sale: routes_AuctionQueryResponse["sale"]): boolean {
  return (sale.is_preview || sale.is_open) && !sale.is_registration_closed
}

function userRegisteredToBid(sale: routes_AuctionQueryResponse["sale"]) {
  return !!sale.registrationStatus
}

function findRedirect(
  sale: routes_AuctionQueryResponse["sale"]
): Redirect | null {
  let redirect
  if (!sale.is_auction) {
    redirect = {
      path: `/sale/${sale.id}`,
      reason: "sale must be an auction",
    }
  } else if (!isRegisterable(sale)) {
    redirect = {
      path: `/auction/${sale.id}`,
      reason: "auction must be registerable",
    }
  } else if (userRegisteredToBid(sale)) {
    redirect = {
      path: `/auction/${sale.id}/confirm-registration`,
      reason: "user is already registered to bid",
    }
  }

  return redirect
}

export const routes: RouteConfig[] = [
  {
    path: "/auction-registration2/:saleID",
    Component: AuctionAppFragmentContainer,
    render: ({ Component, props }) => {
      const { location, sale } = props as any

      const redirect = findRedirect(sale)

      if (redirect) {
        logger.warn(
          `Redirecting from ${location.pathname} to ${redirect.path} because '${
            redirect.reason
          }'`
        )
        throw new RedirectException(redirect.path)
      }

      return <Component {...props} />
    },
    query: graphql`
      query routes_AuctionQuery($saleID: String!) {
        sale: sale(id: $saleID) {
          id
          is_registration_closed
          is_preview
          is_open
          is_auction
          registrationStatus {
            qualified_for_bidding
          }
          ...AuctionApp_sale
        }
      }
    `,
  },
]
