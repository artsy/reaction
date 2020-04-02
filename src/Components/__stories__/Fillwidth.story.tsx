import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { FillwidthQuery } from "__generated__/FillwidthQuery.graphql"
import { ContextModule } from "Artsy/Analytics/v2/Schema"
import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"
import Fillwidth from "../Artwork/Fillwidth"

function FillwidthExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer<FillwidthQuery>
      query={graphql`
        query FillwidthQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworksConnection(first: 6) {
              ...Fillwidth_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <Fillwidth
              {...readyState.props.artist}
              contextModule={ContextModule.header}
            />
          )
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
