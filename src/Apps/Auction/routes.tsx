import { routes_RegisterQueryResponse } from "__generated__/routes_RegisterQuery.graphql"
import { ErrorPage } from "Components/ErrorPage"
import { RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import createLogger from "Utils/logger"
import { RegisterRouteFragmentContainer } from "./Routes/Register"

const logger = createLogger("Apps/Auction/routes")

interface Redirect {
  path: string
  reason: string
}

type Sale = routes_RegisterQueryResponse["sale"]
type Me = routes_RegisterQueryResponse["me"]

export const routes: RouteConfig[] = [
  {
    path: "/auction-registration2/:saleID",
    Component: RegisterRouteFragmentContainer,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { location, sale, me } = props as any

        if (!sale) {
          return <ErrorPage code={404} />
        }

        const redirect = findRedirect(sale, me)

        if (redirect) {
          logger.warn(
            `Redirecting from ${location.pathname} to ${
              redirect.path
            } because '${redirect.reason}'`
          )
          throw new RedirectException(redirect.path)
        }

        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_RegisterQuery($saleID: String!) {
        sale(id: $saleID) {
          id
          is_auction
          is_registration_closed
          is_preview
          is_open
          is_auction
          registrationStatus {
            qualified_for_bidding
          }
          ...Register_sale
        }
        me {
          has_qualified_credit_cards
          ...Register_me
        }
      }
    `,
  },
]

function findRedirect(sale: Sale, me: Me): Redirect | null {
  let redirect = null
  if (me.has_qualified_credit_cards) {
    redirect = {
      path: `/auction/${sale.id}/registration-flow`,
      reason: "user already has a qualified credit card",
    }
  } else if (!sale.is_auction) {
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

function isRegisterable(sale: Sale): boolean {
  return (sale.is_preview || sale.is_open) && !sale.is_registration_closed
}

function userRegisteredToBid(sale: Sale): boolean {
  return !!sale.registrationStatus
}
