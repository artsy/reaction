import { Box, Sans, Spacer } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { withContext } from "Artsy/SystemContext"
import { hasSections as showMarketInsights } from "Components/Artist/MarketInsights/MarketInsights"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Media } from "Utils/Responsive"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

import {
  ArtistBioFragmentContainer as ArtistBio,
  MarketInsightsFragmentContainer as MarketInsights,
  MAX_CHARS,
  SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements,
  SelectedExhibitionFragmentContainer as SelectedExhibitions,
} from "Styleguide/Components"

export interface OverviewRouteProps {
  ARTIST_INSIGHTS?: string
  artist: Overview_artist & {
    __fragments: object[]
  }
  tracking?: TrackingProp
}

interface State {
  isReadMoreExpanded: boolean
}

@track({
  context_module: Schema.ContextModule.ArtistOverview,
})
class OverviewRoute extends React.Component<OverviewRouteProps, State> {
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
    let showGenes = false
    if (this.state.isReadMoreExpanded) {
      showGenes = true
    } else if (!this.props.artist.biography_blurb.text) {
      showGenes = true
    }
    return showGenes
  }

  trackingData() {
    const experiment = "artist_insights"
    const variation = this.props.ARTIST_INSIGHTS || sd.ARTIST_INSIGHTS

    return {
      action_type: Schema.ActionType.ExperimentViewed,
      experiment_id: experiment,
      experiment_name: experiment,
      variation_id: variation,
      variation_name: variation,
      nonInteraction: 1,
    }
  }

  renderArtistInsightsV1() {
    const { artist, tracking } = this.props

    if (tracking) tracking.trackEvent(this.trackingData())

    return <MarketInsights artist={artist} />
  }

  renderArtistInsightsV2() {
    const { artist, tracking } = this.props

    if (tracking) tracking.trackEvent(this.trackingData())

    return <SelectedCareerAchievements artist={artist} />
  }

  render() {
    const { artist } = this.props
    const artistInsightsVariation =
      this.props.ARTIST_INSIGHTS || sd.ARTIST_INSIGHTS
    const showArtistInsightsV1 =
      artistInsightsVariation === "v1" && showMarketInsights(this.props.artist)
    const showArtistInsightsV2 =
      artistInsightsVariation === "v2" &&
      (showMarketInsights(this.props.artist) || artist.insights.length)
    const showArtistInsights = showArtistInsightsV1 || showArtistInsightsV2
    const showSelectedExhibitions =
      Boolean(artist.exhibition_highlights.length) && !showArtistInsightsV2
    const showArtistBio = Boolean(artist.biography_blurb.text)
    const showCurrentEvent = Boolean(artist.currentEvent)
    const showConsignable = Boolean(artist.is_consignable)
    const bioLen = artist.biography_blurb.text.length
    const hideMainOverviewSection =
      !showArtistInsights &&
      !showSelectedExhibitions &&
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
              {showArtistInsightsV2 && (
                <>
                  {this.renderArtistInsightsV2()}
                  <Spacer mb={1} />
                </>
              )}
              {showArtistInsightsV1 && (
                <>
                  {this.renderArtistInsightsV1()}
                  <Spacer mb={1} />
                </>
              )}
              {showSelectedExhibitions && (
                <>
                  <SelectedExhibitions
                    artistID={artist.id}
                    totalExhibitions={this.props.artist.counts.partner_shows}
                    exhibitions={this.props.artist.exhibition_highlights}
                  />
                  <Spacer mb={1} />
                </>
              )}
              {showArtistBio && (
                <>
                  <ArtistBio
                    onReadMoreClicked={() => {
                      this.setState({ isReadMoreExpanded: true })
                    }}
                    bio={artist}
                  />
                  <Spacer mb={1} />
                </>
              )}
              {showGenes && (
                <>
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
        )
      id
      exhibition_highlights(size: 3) {
        ...SelectedExhibitions_exhibitions
      }
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
