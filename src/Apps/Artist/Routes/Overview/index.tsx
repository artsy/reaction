import { Box, Col, Row, Sans, Separator, Spacer } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "Apps/Artist/Components/ArtistCollectionsRail"
import { hasSections as showMarketInsights } from "Apps/Artist/Components/MarketInsights/MarketInsights"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import { withSystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "./Components/ArtistRecommendations"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

import { routes_OverviewQueryRendererQueryResponse } from "__generated__/routes_OverviewQueryRendererQuery.graphql"
import {
  ArtistBioFragmentContainer as ArtistBio,
  SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements,
} from "Components/v2"
import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import { updateUrl } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Location } from "found"
import { TrackingProp } from "react-tracking"
import { get } from "Utils/get"
import { ZeroState } from "./Components/ZeroState"

export interface OverviewRouteProps {
  viewer: routes_OverviewQueryRendererQueryResponse["viewer"]
  artist: Overview_artist
  location: Location
  tracking: TrackingProp
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

    const { artist } = this.props
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

            <ArtworkFilter
              filters={this.props.location.query as any}
              viewer={this.props.viewer}
              sortOptions={[
                { value: "-decayed_merch", text: "Default" },
                { value: "-partner_updated_at", text: "Recently updated" },
                { value: "-published_at", text: "Recently added" },
                { value: "-year", text: "Artwork year (desc.)" },
                { value: "year", text: "Artwork year (asc.)" },
              ]}
              onChange={updateUrl}
              onFilterClick={(key, value, filterState) => {
                this.props.tracking.trackEvent({
                  action_type: Schema.ActionType.CommercialFilterParamsChanged,
                  changed: { [key]: value },
                  current: filterState,
                })
              }}
              ZeroState={ZeroState}
            />
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

export const OverviewRouteFragmentContainer = createFragmentContainer(
  withSystemContext(OverviewRoute),
  {
    artist: graphql`
      fragment Overview_artist on Artist
        @argumentDefinitions(
          partner_category: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
          hasFilter: { type: "Boolean", defaultValue: false }
        ) {
        ...ArtistBio_bio
        ...CurrentEvent_artist
        ...MarketInsights_artist
        ...SelectedCareerAchievements_artist
        ...Genes_artist
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
      }
    `,
  }
)
