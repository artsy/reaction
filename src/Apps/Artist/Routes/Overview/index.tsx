import { Box, Col, Row, Sans, Separator, Spacer } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { withContext } from "Artsy/SystemContext"
import { ArtistCollectionsRail } from "Components/Artist/CollectionsRail/CollectionsRail"
import { hasSections as showMarketInsights } from "Components/Artist/MarketInsights/MarketInsights"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Media } from "Utils/Responsive"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

import {
  ArtistBioFragmentContainer as ArtistBio,
  MAX_CHARS,
  SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements,
} from "Components/v2"

export interface OverviewRouteProps {
  ARTIST_COLLECTIONS_RAIL?: string // TODO: remove after CollectionsRail a/b test
  artist: Overview_artist & {
    __fragments: object[]
  }
}

interface State {
  isReadMoreExpanded: boolean
}

class OverviewRoute extends React.Component<OverviewRouteProps, State> {
  state = {
    isReadMoreExpanded: false,
  }

  componentDidMount() {
    // TODO: remove after CollectionsRail a/b test
    const showCollectionsRail =
      this.props.ARTIST_COLLECTIONS_RAIL || sd.ARTIST_COLLECTIONS_RAIL

    if (showCollectionsRail) {
      this.trackingCollectionsRailTest()
    }
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
    let showGenes = false
    if (this.state.isReadMoreExpanded) {
      showGenes = true
    } else if (!this.props.artist.biography_blurb.text) {
      showGenes = true
    }
    return showGenes
  }

  @track<OverviewRouteProps>(props => {
    // TODO: remove after CollectionsRail a/b test
    const experiment = "artist_collections_rail"
    const variation =
      props.ARTIST_COLLECTIONS_RAIL || sd.ARTIST_COLLECTIONS_RAIL

    return {
      action_type: Schema.ActionType.ExperimentViewed,
      experiment_id: experiment,
      experiment_name: experiment,
      variation_id: variation,
      variation_name: variation,
      nonInteraction: 1,
    }
  })
  trackingCollectionsRailTest() {
    // no-op
  }

  render() {
    const { artist } = this.props
    const collectionsRailVariation =
      this.props.ARTIST_COLLECTIONS_RAIL || sd.ARTIST_COLLECTIONS_RAIL
    const showCollectionsRail = collectionsRailVariation === "experiment"

    const showArtistInsights =
      showMarketInsights(this.props.artist) || artist.insights.length > 0
    const showArtistBio = Boolean(artist.biography_blurb.text)
    const showCurrentEvent = Boolean(artist.currentEvent)
    const showConsignable = Boolean(artist.is_consignable)
    const bioLen = artist.biography_blurb.text.length
    const hideMainOverviewSection =
      !showArtistInsights &&
      !showArtistBio &&
      !showCurrentEvent &&
      !showConsignable

    // TODO: Hide right column if missing current event. Waiting on feedback
    const colNum = 9 // artist.currentEvent ? 9 : 12
    const showGenes = this.maybeShowGenes()

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
                  <Media at="xs">
                    {bioLen < MAX_CHARS.xs ? (
                      <>
                        <Genes artist={artist} />
                      </>
                    ) : (
                      showGenes && <Genes artist={artist} />
                    )}
                  </Media>
                  <Media greaterThan="xs">
                    {bioLen < MAX_CHARS.default ? (
                      <>
                        <Genes artist={artist} />
                      </>
                    ) : (
                      showGenes && <Genes artist={artist} />
                    )}
                  </Media>
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
                    </a>.
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

        {showCollectionsRail && ( // TODO: remove after CollectionsRail a/b test
          <div>
            <Separator mb={3} />
            <ArtistCollectionsRail />
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
      </>
    )
  }
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  withContext(OverviewRoute),
  graphql`
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
      ) {
      ...ArtistBio_bio
      ...CurrentEvent_artist
      ...MarketInsightsArtistPage_artist
      ...SelectedCareerAchievementsArtistPage_artist
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
        )
      id
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
    }
  `
)
