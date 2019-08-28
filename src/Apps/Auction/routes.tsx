import { ErrorPage } from "Components/ErrorPage"
import { RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import createLogger from "Utils/logger"
import { findRedirect } from "./redirects"
import { RegisterRouteFragmentContainer } from "./Routes/Register"

const logger = createLogger("Apps/Auction/routes")

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
