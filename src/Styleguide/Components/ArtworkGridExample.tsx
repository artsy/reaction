import React from "react"
import { graphql } from "react-relay"

import ArtworkGrid from "Components/ArtworkGrid"
import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"

export function ArtworkGridExample(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkGridExampleQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <ArtworkGrid {...readyState.props.artist as any} {...props} />
          )
        )
      }}
    />
  )
}
