import { CV_viewer } from "__generated__/CV_viewer.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"
import { CVPaginationContainer as CVItem } from "./CVItem"

export interface CVRouteProps {
  viewer: CV_viewer
}

export class CVRoute extends React.Component<CVRouteProps> {
  render() {
    const { viewer } = this.props

    return (
      <React.Fragment>
        <CVItem category="Solo shows" artist={viewer.artist_soloShows as any} />
        <Spacer my={1} />

        <CVItem
          category="Group shows"
          artist={viewer.artist_groupShows as any}
        />
        <Spacer my={1} />

        <CVItem
          category="Fair booths"
          artist={viewer.artist_fairBooths as any}
        />
      </React.Fragment>
    )
  }
}

export const CVRouteFragmentContainer = createFragmentContainer(
  CVRoute,
  graphql`
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
  `
)
