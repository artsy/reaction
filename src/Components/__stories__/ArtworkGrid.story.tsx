import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import ArtworkGrid from "../ArtworkGrid"

function GridExample(props: { artistID: string }) {
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
            <ArtworkGrid {...readyState.props.artist as any} />
          )
        )
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module).add(
  "A typical grid",
  () => {
    return <GridExample artistID="banksy" />
  }
)
