import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"
import { ArtworkGridFixture } from "../__tests__/ArtworkGridFixture"
import RelayArtworkGrid, { ArtworkGrid } from "../ArtworkGrid"

export function ArtworkGridExample(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkGridQuery($artistID: String!) {
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
            <RelayArtworkGrid {...readyState.props.artist as any} {...props} />
          )
        )
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module)
  .add("A typical grid", () => {
    return <ArtworkGridExample artistID="banksy" />
  })
  .add("An empty grid", () => {
    return <ArtworkGridExample artistID="sydney-shen" />
  })
  .add("Without Relay", () => {
    return <ArtworkGrid artworks={ArtworkGridFixture as any} useRelay={false} />
  })
