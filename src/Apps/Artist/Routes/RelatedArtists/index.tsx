import { RelatedArtists_viewer } from "__generated__/RelatedArtists_viewer.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"
import { RelatedArtistsRefetchContainer as RelatedArtistsList } from "./RelatedArtistsList"

export interface RelatedArtistsProps {
  viewer: RelatedArtists_viewer
}

export class RelatedArtistsRoute extends Component<RelatedArtistsProps> {
  render() {
    const { viewer } = this.props

    return (
      <React.Fragment>
        <RelatedArtistsList
          kind={"MAIN"}
          artist={viewer.mainArtists as any}
          scrollTo="#jumpto-RouteTabs"
        />

        <Spacer mb={1} />
      </React.Fragment>
    )
  }
}

export const RelatedArtistsRouteFragmentContainer = createFragmentContainer(
  RelatedArtistsRoute,
  graphql`
    fragment RelatedArtists_viewer on Viewer
      @argumentDefinitions(
        mainKind: { type: "RelatedArtistsKind", defaultValue: "MAIN" }
        contemporaryKind: {
          type: "RelatedArtistsKind"
          defaultValue: "CONTEMPORARY"
        }
      ) {
      mainArtists: artist(id: $artistID) {
        ...RelatedArtistsList_artist @arguments(kind: $mainKind)
      }
      contemporaryArtists: artist(id: $artistID) {
        ...RelatedArtistsList_artist @arguments(kind: $contemporaryKind)
      }
    }
  `
)
