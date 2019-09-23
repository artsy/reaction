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
import { BaseArtworkFilter } from "Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Location } from "found"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { TrackingProp } from "react-tracking"
import { get } from "Utils/get"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "./Components/ArtistRecommendations"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"
import { ZeroState } from "./Components/ZeroState"

export interface OverviewRouteProps {
  artist: Overview_artist
  location?: Location
  relay?: RelayRefetchProp
  tracking?: TrackingProp
}

interface State {
  isReadMoreExpanded: boolean
}

@track()
export class OverviewRoute extends React.Component<OverviewRouteProps, State> {
  state = {
    isReadMoreExpanded: false,
  }

  @track<OverviewRouteProps>(props => ({
    action_type: Schema.ActionType.Click,
    // TODO: Feel like these should become enums too
    subject: "Learn more about consignment",
    destination_path: props.artist.href,
  }))
  handleConsignClick() {
    // no-op
  }

  maybeShowGenes() {
    const { isReadMoreExpanded } = this.state
    const hasNoBio = !this.props.artist.biography_blurb.text

    return isReadMoreExpanded || hasNoBio
  }

  render() {
    if (!this.props) {
      return null
    }

    const { artist, location, relay } = this.props
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
    const showGenes = this.maybeShowGenes()

    const showRecommendations =
      get(artist, a => a.related.artists.edges.length, 0) > 0

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
              {showGenes && (
                <>
                  <Spacer mb={1} />
                  <Genes artist={artist} />
                  <Spacer mb={1} />
                </>
              )}
              {showConsignable && (
                <>
                  <Spacer mb={1} />
                  <Sans size="2" color="black60">
                    Want to sell a work by this artist?{" "}
                    <a
                      href="/consign"
                      onClick={this.handleConsignClick.bind(this)}
                    >
                      Learn more
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

        <Box>
          <Separator mb={3} />
          <ArtistCollectionsRail artistID={artist._id} />
          <Spacer mb={3} />
        </Box>

        <Row>
          <Col>
            <span id="jump--artistArtworkGrid" />

            <ArtworkFilterContextProvider
              filters={location.query}
              sortOptions={[
                { value: "-decayed_merch", text: "Default" },
                { value: "-partner_updated_at", text: "Recently updated" },
                { value: "-published_at", text: "Recently added" },
                { value: "-year", text: "Artwork year (desc.)" },
                { value: "year", text: "Artwork year (asc.)" },
              ]}
              aggregations={artist.sidebarAggregations.aggregations as any}
              counts={artist.counts}
              onChange={updateUrl}
              onFilterClick={(key, value, filterState) => {
                this.props.tracking.trackEvent({
                  action_type: Schema.ActionType.CommercialFilterParamsChanged,
                  changed: { [key]: value },
                  current: filterState,
                })
              }}
            >
              <BaseArtworkFilter relay={relay} viewer={artist}>
                {artist.counts.artworks.length === 0 && (
                  <ZeroState artist={artist} is_followed={artist.is_followed} />
                )}
              </BaseArtworkFilter>
            </ArtworkFilterContextProvider>
          </Col>
        </Row>

        {showRecommendations && (
          <Row>
            <Col>
              <Separator mt={6} mb={4} />
              <ArtistRecommendations artistID={artist._id} />
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
    $artist_id: String!
    $at_auction: Boolean
    $attribution_class: [String]
    $color: String
    $for_sale: Boolean
    $hasFilter: Boolean!
    $height: String
    $inquireable_only: Boolean
    $keyword: String
    $major_periods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $partner_category: [String]
    $partner_id: ID
    $price_range: String
    $sort: String
    $width: String
  ) {
    artist(id: $artist_id) {
      ...Overview_artist
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          artist_id: $artist_id
          at_auction: $at_auction
          attribution_class: $attribution_class
          color: $color
          for_sale: $for_sale
          hasFilter: $hasFilter
          height: $height
          inquireable_only: $inquireable_only
          keyword: $keyword
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          partner_id: $partner_id
          price_range: $price_range
          sort: $sort
          width: $width
        )
    }
  }
`

export const OverviewRouteFragmentContainer = createRefetchContainer(
  withSystemContext(OverviewRoute),
  {
    artist: graphql`
      fragment Overview_artist on Artist
        @argumentDefinitions(
          partner_category: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          artist_id: { type: "String" }
          at_auction: { type: "Boolean" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          for_sale: { type: "Boolean" }
          hasFilter: { type: "Boolean", defaultValue: false }
          height: { type: "String" }
          inquireable_only: { type: "Boolean" }
          keyword: { type: "String" }
          major_periods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partner_id: { type: "ID" }
          price_range: { type: "String" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
        ) {
        ...ArtistBio_bio
        ...CurrentEvent_artist
        ...MarketInsights_artist
        ...SelectedCareerAchievements_artist
        ...Genes_artist
        ...FollowArtistButton_artist
        id
        counts {
          partner_shows
          for_sale_artworks
          ecommerce_artworks
          auction_artworks
          artworks
          has_make_offer_artworks
        }
        href
        is_followed
        is_consignable
        # NOTE: The following are used to determine whether sections
        # should be rendered.
        biography_blurb(format: HTML, partner_bio: true) {
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
                id
              }
            }
          }
          artists(first: 1) {
            edges {
              node {
                __id
              }
            }
          }
        }
        _id
        collections
        highlights {
          partners(
            first: 10
            display_on_partner_profile: true
            represented_by: true
            partner_category: $partner_category
          ) {
            edges {
              node {
                categories {
                  id
                }
              }
            }
          }
        }
        insights {
          type
        }

        sidebarAggregations: filtered_artworks(
          sort: $sort
          page: $page
          aggregations: $aggregations
        ) {
          aggregations {
            slice
            counts {
              name
              id
            }
          }
        }

        filtered_artworks(
          acquireable: $acquireable
          aggregations: $aggregations
          artist_id: $artist_id
          at_auction: $at_auction
          attribution_class: $attribution_class
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          keyword: $keyword
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          partner_id: $partner_id
          price_range: $price_range
          size: 0
          sort: $sort
          width: $width
        ) {
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  ArtistOverviewQuery
)
