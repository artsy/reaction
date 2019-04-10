import { Spacer } from "@artsy/palette"
import { RelatedArtists_viewer } from "__generated__/RelatedArtists_viewer.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RelatedArtistsListRefetchContainer as RelatedArtistsList } from "./RelatedArtistsList"

export interface RelatedArtistsListProps {
  viewer: RelatedArtists_viewer
}

export const RelatedArtistsRoute: SFC<RelatedArtistsListProps> = props => {
  return (
    <>
      <RelatedArtistsList
        kind={"MAIN"}
        artist={props.viewer.mainArtists}
        scrollTo="#jumpto-ArtistHeader"
      />

      <Spacer mb={1} />
    </>
  )
}

export const RelatedArtistsRouteFragmentContainer = createFragmentContainer(
  RelatedArtistsRoute,
  {
    viewer: graphql`
      fragment RelatedArtists_viewer on Viewer
        @argumentDefinitions(
          mainKind: { type: "RelatedArtistsKind", defaultValue: "MAIN" }
        ) {
        mainArtists: artist(id: $artistID) {
          ...RelatedArtistsList_artist @arguments(kind: $mainKind)
        }
      }
    `,
  }
)
