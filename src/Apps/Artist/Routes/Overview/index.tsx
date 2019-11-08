import { Box, Col, Row, Sans, Separator, Spacer } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "Apps/Artist/Components/ArtistCollectionsRail"
import { hasSections as showMarketInsights } from "Apps/Artist/Components/MarketInsights/MarketInsights"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import { withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import {
  ArtistBioFragmentContainer as ArtistBio,
  SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements,
} from "Components/v2"

import React from "react"
import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { TrackingProp } from "react-tracking"
import { get } from "Utils/get"
import { ArtistArtworkFilterRefetchContainer as ArtworkFilter } from "./Components/ArtistArtworkFilter"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "./Components/ArtistRecommendations"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

export interface OverviewRouteProps {
  artist: Overview_artist
  relay?: RelayRefetchProp
  tracking?: TrackingProp
}

@track()
export class OverviewRoute extends React.Component<OverviewRouteProps, {}> {
  @track<OverviewRouteProps>(props => ({
    action_type: Schema.ActionType.Click,
    // TODO: Feel like these should become enums too
    subject: "Learn more about consignment",
    destination_path: props.artist.href,
  }))
  handleConsignClick() {
    // no-op
  }

  render() {
    if (!this.props) {
      return null
    }

    const { artist } = this.props
    const { sidebarAggregations } = artist
    const showArtistInsights =
      showMarketInsights(this.props.artist) || artist.insights.length > 0
    const showArtistBio = Boolean(artist.biography_blurb.text)
    const showCurrentEvent = Boolean(artist.currentEvent)
    const showConsignable = Boolean(artist.is_consignable)
    const hideMainOverviewSection =
      !showArtistInsights &&
      !showArtistBio &&
      !showCurrentEvent &&
      !showConsignable

    // TODO: Hide right column if missing current event. Waiting on feedback
    const colNum = 9 // artist.currentEvent ? 9 : 12

    const isClient = typeof window !== "undefined"
    const showRecommendations =
      isClient &&
      get(artist, a => a.related.artistsConnection.edges.length, 0) > 0
    return (
      <>
        <Row>
          <Col sm={colNum}>
            <>
              {showArtistBio && (
                <>
                  <ArtistBio
                    onReadMoreClicked={() => {
                      this.setState({ isReadMoreExpanded: true })
                    }}
                    bio={artist}
                  />
                </>
              )}
              <>
                <Spacer mb={1} />
                <Genes artist={artist} />
                <Spacer mb={1} />
              </>
              {showConsignable && (
                <>
                  <Spacer mb={1} />
                  <Sans size="2" color="black60">
                    Want to sell a work by this artist?{" "}
                    <a
                      href="/consign"
                      onClick={this.handleConsignClick.bind(this)}
                    >
                      Consign with Artsy
                    </a>
                    .
                  </Sans>
                </>
              )}
              {showArtistInsights && (
                <>
                  <Spacer mb={2} />
                  <SelectedCareerAchievements artist={artist} />
                </>
              )}
            </>
          </Col>

          {showCurrentEvent && (
            <Col sm={3}>
              <Box pl={2}>
                <CurrentEvent artist={artist} />
              </Box>
            </Col>
          )}
        </Row>

        {!hideMainOverviewSection && <Spacer mb={4} />}

        <Box>{<ArtistCollectionsRail artistID={artist.internalID} />}</Box>

        <Row>
          <Col>
            <span id="jump--artistArtworkGrid" />

            <ArtworkFilter
              artist={artist}
              sidebarAggregations={sidebarAggregations}
            />
          </Col>
        </Row>

        {showRecommendations && (
          <Row>
            <Col>
              <Separator mt={6} mb={4} />
              <ArtistRecommendations artistID={artist.internalID} />
            </Col>
          </Row>
        )}
      </>
    )
  }
}

export const ArtistOverviewQuery = graphql`
  query OverviewQuery(
    $acquireable: Boolean
    $aggregations: [ArtworkAggregation] = [
      MEDIUM
      TOTAL
      GALLERY
      INSTITUTION
      MAJOR_PERIOD
    ]
    $artistID: String!
    $atAuction: Boolean
    $attributionClass: [String]
    $color: String
    $forSale: Boolean
    $hasFilter: Boolean!
    $height: String
    $inquireableOnly: Boolean
    $keyword: String
    $majorPeriods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $partnerCategory: [String]
    $partnerID: ID
    $priceRange: String
    $sort: String
    $width: String
  ) {
    artist(id: $artistID) {
      ...Overview_artist
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          artistID: $artistID
          atAuction: $atAuction
          attributionClass: $attributionClass
          color: $color
          forSale: $forSale
          hasFilter: $hasFilter
          height: $height
          inquireableOnly: $inquireableOnly
          keyword: $keyword
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sort: $sort
          width: $width
        )
    }
  }
`

export const OverviewRouteFragmentContainer = createFragmentContainer(
  withSystemContext(OverviewRoute),
  {
    artist: graphql`
      fragment Overview_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          artistID: { type: "String" }
          atAuction: { type: "Boolean" }
          attributionClass: { type: "[String]" }
          color: { type: "String" }
          forSale: { type: "Boolean" }
          hasFilter: { type: "Boolean", defaultValue: false }
          height: { type: "String" }
          inquireableOnly: { type: "Boolean" }
          keyword: { type: "String" }
          majorPeriods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partnerID: { type: "ID" }
          priceRange: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
        ) {
        ...ArtistBio_bio
        ...CurrentEvent_artist
        ...MarketInsights_artist
        ...SelectedCareerAchievements_artist
        ...Genes_artist
        ...FollowArtistButton_artist
        slug
        id
        counts {
          partner_shows: partnerShows
          for_sale_artworks: forSaleArtworks
          ecommerce_artworks: ecommerceArtworks
          auction_artworks: auctionArtworks
          artworks
          has_make_offer_artworks: hasMakeOfferArtworks
        }
        href
        is_consignable: isConsignable
        # NOTE: The following are used to determine whether sections
        # should be rendered.
        biography_blurb: biographyBlurb(format: HTML, partnerBio: true) {
          text
          credit
        }
        currentEvent {
          name
        }
        related {
          genes {
            edges {
              node {
                slug
              }
            }
          }
          artistsConnection(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
        internalID
        collections
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }
        insights {
          type
        }
        sidebarAggregations: filterArtworksConnection(
          sort: $sort
          page: $page
          aggregations: $aggregations
          first: 30
          after: ""
        ) {
          aggregations {
            slice
            counts {
              name
              value
            }
          }
          # FIXME: Might need to reenable the below.
          # Include the below fragment so that this will match
          # the initial load (w/ no filter applied), and thus MP
          # will consolidate aggregations _and_ the grid into one call.
          # Leave out this fragment if navigating to the artist page
          # with a filter applied, as those can't be consolidated and
          # this is extra data.
          # artworks_connection: artworksConnection(first: 30, after: "")
          #   @skip(if: $hasFilter) {
          #   edges {
          #     node {
          #       slug
          #     }
          #   }
          # }
        }
        ...ArtistArtworkFilter_artist
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            artistID: $artistID
            atAuction: $atAuction
            attributionClass: $attributionClass
            color: $color
            forSale: $forSale
            hasFilter: $hasFilter
            height: $height
            inquireableOnly: $inquireableOnly
            keyword: $keyword
            majorPeriods: $majorPeriods
            medium: $medium
            offerable: $offerable
            page: $page
            partnerID: $partnerID
            priceRange: $priceRange
            sort: $sort
            width: $width
          )
      }
    `,
  }
)
