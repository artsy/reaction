import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"
import Fillwidth from "../Artwork/Fillwidth"

function FillwidthExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query FillwidthQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 6) {
              ...Fillwidth_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && <Fillwidth {...readyState.props.artist as any} />
        )
      }}
    />
  )
}

storiesOf("Components/Artworks/Fillwidth", module).add(
  "A typical fillwidth",
  () => {
    return <FillwidthExample artistID="stephen-willats" />
  }
)
