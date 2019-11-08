import React from "react"
import { graphql } from "react-relay"

import { ArtworkGridExampleQuery } from "__generated__/ArtworkGridExampleQuery.graphql"
import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"
import ArtworkGrid from "Components/ArtworkGrid"

export function ArtworkGridExample(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer<ArtworkGridExampleQuery>
      query={graphql`
        query ArtworkGridExampleQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworksConnection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <ArtworkGrid {...readyState.props.artist} {...props} />
          )
        )
      }}
    />
  )
}
