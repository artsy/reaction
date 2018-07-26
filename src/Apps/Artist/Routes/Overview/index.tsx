import { Sans } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "Styleguide/Components/ArtistBio"
import { MarketInsightsFragmentContainer as MarketInsights } from "Styleguide/Components/MarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

export interface OverviewRouteProps {
  artist: Overview_artist
}

interface State {
  isReadMoreExpanded: boolean
}

@track({ context_module: "ArtistOverview" })
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

  render() {
    const { artist } = this.props
    const showGenes =
      this.state.isReadMoreExpanded || !artist.biography_blurb.text

    return (
      <React.Fragment>
        <Row>
          <Col sm={9}>
            <MarketInsights artist={artist as any} />
            <Spacer mb={1} />

            <SelectedExhibitions
              artistID={artist.id}
              totalExhibitions={this.props.artist.counts.partner_shows}
              exhibitions={this.props.artist.exhibition_highlights as any}
            />

            <Box mt={3} mb={1}>
              <ArtistBio
                onReadMoreClicked={() => {
                  this.setState({ isReadMoreExpanded: true })
                }}
                bio={artist as any}
              />
            </Box>

            {showGenes && <Genes artist={artist as any} />}

            <Spacer mb={1} />

            {artist.is_consignable && (
              <Sans size="2" color="black60">
                Want to sell a work by this artist?{" "}
                <a href="/consign" onClick={this.handleConsignClick.bind(this)}>
                  Learn more
                </a>.
              </Sans>
            )}
          </Col>
          <Col sm={3}>
            <Box pl={2}>
              <CurrentEvent artist={artist as any} />
            </Box>
          </Col>
        </Row>

        <Spacer mb={4} />

        <Row>
          <Col>
            <span id="jump--artistArtworkGrid" />

            <ArtworkFilter artist={artist as any} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  OverviewRoute,
  graphql`
    fragment Overview_artist on Artist
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID!" }
        for_sale: { type: "Boolean" }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
      ) {
      ...ArtistHeader_artist
      ...ArtistBio_bio
      ...CurrentEvent_artist
      ...MarketInsightsArtistPage_artist
      id
      exhibition_highlights(size: 3) {
        ...SelectedExhibitions_exhibitions
      }
      counts {
        partner_shows
      }

      biography_blurb(format: HTML, partner_bio: true) {
        text
        credit
      }

      href
      is_consignable

      ...Genes_artist

      ...ArtworkFilter_artist
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
        )
    }
  `
)
