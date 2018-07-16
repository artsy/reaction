import { space } from "@artsy/palette"
import { CV_viewer } from "__generated__/CV_viewer.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join } from "Styleguide/Elements/Join"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Utils/Responsive"
import { CVPaginationContainer as CVItem } from "./CVItem"

export interface CVRouteProps {
  viewer: CV_viewer
}

// Element spacing - correction for lineheight
const sectionSpace = space(4) - 4

export class CVRoute extends Component<CVRouteProps> {
  render() {
    const { viewer } = this.props

    return (
      <Responsive>
        {({ sm, xs }) => (
          <Join separator={!xs && <Separator mb={sectionSpace} />}>
            <CVItem
              category="Solo shows"
              artist={viewer.artist_soloShows as any}
            />
            <CVItem
              category="Group shows"
              artist={viewer.artist_groupShows as any}
            />
            <CVItem
              category="Fair booths"
              artist={viewer.artist_fairBooths as any}
            />
          </Join>
        )}
      </Responsive>
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
