import { Box, Col, Row, Sans, Separator, Spacer } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import { SystemContextConsumer } from "Artsy"
import { withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "Components/Artist/ArtistCollectionsRail"
import { hasSections as showMarketInsights } from "Components/Artist/MarketInsights/MarketInsights"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "./Components/ArtistRecommendations"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

import {
  ArtistBioFragmentContainer as ArtistBio,
  SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements,
} from "Components/v2"
import { get } from "Utils/get"

export interface OverviewRouteProps {
  artist: Overview_artist & {
    __fragments: object[]
  }
}

interface State {
  isReadMoreExpanded: boolean
}

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

  shouldShowCollectionsRail(collections, artistID): boolean {
    const hasFeaturedArtistContent: boolean = collections.some(
      collection => collection.is_featured_artist_content
    )

    const artistInCollectionQuery: boolean = collections.some(
      collection =>
        collection.query &&
        collection.query.artist_ids &&
        collection.query.artist_ids.includes(artistID)
    )

    if (!hasFeaturedArtistContent) {
      return false
    }

    if (artistInCollectionQuery || hasFeaturedArtistContent) {
      return true
    }

    return false
  }

  render() {
    const { artist } = this.props
    const { marketingCollections } = artist

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
    const artistID = artist._id
    const showArtistCollectionsRail =
      (marketingCollections || []).length > 0
        ? this.shouldShowCollectionsRail(marketingCollections, artistID)
        : false

    // TODO: Hide right column if missing current event. Waiting on feedback
    const colNum = 9 // artist.currentEvent ? 9 : 12
    const showGenes = this.maybeShowGenes()

    return (
      <SystemContextConsumer>
        {({ user }) => {
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

              {showArtistCollectionsRail && (
                <div>
                  <Separator mb={3} />
                  <ArtistCollectionsRail artistID={artistID} />
                  <Spacer mb={3} />
                </div>
              )}

              <Row>
                <Col>
                  <span id="jump--artistArtworkGrid" />

                  <ArtworkFilter
                    artist={artist}
                    hideTopBorder={hideMainOverviewSection}
                  />
                </Col>
              </Row>

              {showRecommendations && (
                <Row>
                  <Col>
                    <Separator mt={6} mb={4} />
                    <ArtistRecommendations artistID={artistID} />
                  </Col>
                </Row>
              )}
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  withSystemContext(OverviewRoute),
  {
    artist: graphql`
      fragment Overview_artist on Artist
        @argumentDefinitions(
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID!" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-decayed_merch" }
          partner_category: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
          price_range: { type: "String", defaultValue: "*-*" }
          page: { type: "Int" }
        ) {
        ...ArtistBio_bio
        ...CurrentEvent_artist
        ...MarketInsights_artist
        ...SelectedCareerAchievements_artist
        ...Genes_artist
        ...ArtworkFilter_artist
          @arguments(
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            sort: $sort
            at_auction: $at_auction
            acquireable: $acquireable
            inquireable_only: $inquireable_only
            offerable: $offerable
            price_range: $price_range
            page: $page
          )
        id
        _id
        counts {
          partner_shows
        }
        href
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
        marketingCollections {
          id
          is_featured_artist_content
          query {
            artist_ids
          }
        }
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
      }
    `,
  }
)
