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
      <>
        <RelatedArtistsList
          kind={"MAIN"}
          artist={viewer.mainArtists}
          scrollTo="#jumpto-ArtistHeader"
        />

        <Spacer mb={1} />
      </>
    )
  }
}

export const RelatedArtistsRouteFragmentContainer = createFragmentContainer(
  RelatedArtistsRoute,
  graphql`
    fragment RelatedArtists_viewer on Viewer
      @argumentDefinitions(
        mainKind: { type: "RelatedArtistsKind", defaultValue: "MAIN" }
      ) {
      mainArtists: artist(id: $artistID) {
        ...RelatedArtistsList_artist @arguments(kind: $mainKind)
      }
    }
  `
)
