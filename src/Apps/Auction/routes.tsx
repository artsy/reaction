import { ErrorPage } from "Components/ErrorPage"
import { RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import createLogger from "Utils/logger"
import { AuctionFAQQueryRenderer as AuctionFAQ } from "./Components/AuctionFAQ"
import { confirmBidRedirect, Redirect, registerRedirect } from "./getRedirect"
import { ConfirmBidRouteFragmentContainer } from "./Routes/ConfirmBid"
import { RegisterRouteFragmentContainer } from "./Routes/Register"

const logger = createLogger("Apps/Auction/routes")

export const routes: RouteConfig[] = [
  {
    path: "/auction-faq",
    Component: AuctionFAQ,
  },
  {
    path: "/auction/:saleID/bid(2)?/:artworkID",
    Component: ConfirmBidRouteFragmentContainer,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { artwork, me, location } = props as any
        if (!artwork) {
          return <ErrorPage code={404} />
        }
        handleRedirect(confirmBidRedirect({ artwork, me }, location), location)
        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_ConfirmBidQuery($saleID: String!, $artworkID: String!) {
        artwork(id: $artworkID) {
          ...LotInfo_artwork
          _id
          id
          saleArtwork: sale_artwork(sale_id: $saleID) {
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
            _id
            id
            sale {
              registrationStatus {
                id
                qualified_for_bidding
              }
              _id
              id
              name
              is_closed
              is_registration_closed
            }
          }
        }
        me {
          id
          has_qualified_credit_cards
        }
      }
    `,
  },
  {
    path: "/auction-registration(2)?/:saleID",
    Component: RegisterRouteFragmentContainer,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { location, sale, me } = props as any

        if (!sale) {
          return <ErrorPage code={404} />
        }

        handleRedirect(registerRedirect({ sale, me }), location)

        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_RegisterQuery($saleID: String!) {
        sale(id: $saleID) @principalField {
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

function handleRedirect(redirect: Redirect, location: Location) {
  if (redirect) {
    logger.warn(
      `Redirecting from ${location.pathname} to ${redirect.path} because '${
        redirect.reason
      }'`
    )
    throw new RedirectException(redirect.path)
  }
}
