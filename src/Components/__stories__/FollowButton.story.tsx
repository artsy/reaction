import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import { FollowArtistButton } from "../FollowButton/FollowArtistButton"
import Follow from "../Follow"

const ArtistFollowQuery = graphql`
  query ArtistFollowQuery($artistID: String!) {
    artist(id: $artistID) {
      ...Follow_artist
    }
  }
`

function ArtistTextExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={ArtistFollowQuery}
      variables={{ artistID: props.artistID }}
      render={readyState =>
        readyState.props && <Follow {...readyState.props as any} />
      }
    />
  )
}
function ArtistButtonExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={ArtistFollowQuery}
      variables={{ artistID: props.artistID }}
      render={readyState =>
        readyState.props && <FollowArtistButton {...readyState.props as any} />
      }
    />
  )
}

storiesOf("Components/Follow Button", module)
  .add("Follow Artist (text)", () => {
    return (
      <div>
        <ArtistTextExample artistID="damon-zucconi" />
      </div>
    )
  })
  .add("Follow Artist (button)", () => {
    return (
      <div>
        <ArtistButtonExample artistID="damon-zucconi" />
      </div>
    )
  })
