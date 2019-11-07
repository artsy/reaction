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
        const { artwork, me, match } = props as any
        if (!artwork) {
          return <ErrorPage code={404} />
        }
        handleRedirect(
          confirmBidRedirect({ artwork, me }, match.location),
          match.location
        )
        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_ConfirmBidQuery($saleID: String!, $artworkID: String!) {
        artwork(id: $artworkID) {
          ...LotInfo_artwork
          id
          internalID
          slug
          saleArtwork(saleID: $saleID) {
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
            id
            internalID
            slug
            sale {
              id
              registrationStatus {
                internalID
                qualifiedForBidding
              }
              internalID
              slug
              name
              isClosed
              isRegistrationClosed
            }
          }
        }
        me {
          id
          internalID
          hasQualifiedCreditCards
        }
      }
    `,
  },
  {
    path: "/auction-registration(2)?/:saleID",
    Component: RegisterRouteFragmentContainer,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { match, sale, me } = props as any

        if (!sale) {
          return <ErrorPage code={404} />
        }

        handleRedirect(registerRedirect({ sale, me }), match.location)

        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_RegisterQuery($saleID: String!) {
        sale(id: $saleID) @principalField {
          slug
          isAuction
          isRegistrationClosed
          isPreview
          isOpen
          isAuction
          registrationStatus {
            qualifiedForBidding
          }
          ...Register_sale
        }
        me {
          hasQualifiedCreditCards
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
