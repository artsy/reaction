import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import MarketInsights from "../Artist/MarketInsights"

function ArtistExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query MarketInsightsQuery($artistID: String!) {
          artist(id: $artistID) {
            ...MarketInsights_artist
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return readyState.props && <MarketInsights artist={readyState.props.artist} />
      }}
    />
  )
}

storiesOf("Components/Artist/MarketInsights", module)
  .add("Pablo Picasso", () => {
    return <ArtistExample artistID="pablo-picasso" />
  })
  .add("Andy Warhol", () => {
    return <ArtistExample artistID="andy-warhol" />
  })
  .add("Damon Zucconi", () => {
    return <ArtistExample artistID="damon-zucconi" />
  })
