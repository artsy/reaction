import { CV_viewer } from "__generated__/CV_viewer.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { CVPaginationContainer as CVItem } from "./CVItem"

export interface CVRouteProps {
  viewer: CV_viewer
}

const Container = styled.div`
  .cvItems:last-child {
    .cvSeparator {
      display: none;
    }
  }
`

export class CVRoute extends Component<CVRouteProps> {
  render() {
    const { viewer } = this.props
    return (
      <Container>
        <CVItem category="Solo shows" artist={viewer.artist_soloShows} />
        <CVItem category="Group shows" artist={viewer.artist_groupShows} />
        <CVItem category="Fair booths" artist={viewer.artist_fairBooths} />
      </Container>
    )
  }
}

export const CVRouteFragmentContainer = createFragmentContainer(CVRoute, {
  viewer: graphql`
    fragment CV_viewer on Viewer
      @argumentDefinitions(
        soloShows_at_a_fair: { type: "Boolean", defaultValue: false }
        soloShows_solo_show: { type: "Boolean", defaultValue: true }
        groupShows_at_a_fair: { type: "Boolean", defaultValue: false }
        fairBooths_at_a_fair: { type: "Boolean", defaultValue: true }
      ) {
      artist_soloShows: artist(id: $artistID) {
        ...CVItem_artist
          @arguments(
            at_a_fair: $soloShows_at_a_fair
            solo_show: $soloShows_solo_show
          )
      }
      artist_groupShows: artist(id: $artistID) {
        ...CVItem_artist @arguments(at_a_fair: $groupShows_at_a_fair)
      }
      artist_fairBooths: artist(id: $artistID) {
        ...CVItem_artist @arguments(at_a_fair: $fairBooths_at_a_fair)
      }
    }
  `,
})
