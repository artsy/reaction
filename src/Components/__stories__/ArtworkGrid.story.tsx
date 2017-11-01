import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import ArtworkGrid from "../ArtworkGrid"

function GridExample(props: { artistID: string; currentUser: User }) {
  return (
    <RootQueryRenderer
      currentUser={props.currentUser}
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
        return readyState.props && <ArtworkGrid {...readyState.props.artist as any} />
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module).add("A typical grid", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return <GridExample artistID="banksy" currentUser={user} />
})
