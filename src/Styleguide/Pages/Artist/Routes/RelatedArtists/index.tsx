import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RelatedArtistsRefetchContainer as RelatedArtists } from "./RelatedArtistsRefetchContainer"

import { RelatedArtists_viewer } from "__generated__/RelatedArtists_viewer.graphql"

export interface RelatedArtistsProps {
  viewer: RelatedArtists_viewer
}

export class RelatedArtistsRoute extends React.Component<RelatedArtistsProps> {
  render() {
    const { viewer } = this.props
    return (
      <React.Fragment>
        <Sans size="3" weight="medium">
          Related
        </Sans>

        <RelatedArtists kind={"MAIN"} artist={viewer.mainArtists as any} />
        <Sans size="3" weight="medium">
          Suggested contemporary
        </Sans>
        <RelatedArtists
          kind={"CONTEMPORARY"}
          artist={viewer.mainArtists as any}
        />
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
        ...RelatedArtistsRefetchContainer_artist @arguments(kind: $mainKind)
      }
      contemporaryArtists: artist(id: $artistID) {
        ...RelatedArtistsRefetchContainer_artist
          @arguments(kind: $contemporaryKind)
      }
    }
  `
)
