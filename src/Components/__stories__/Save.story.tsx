import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import GridItem from "../Artwork/GridItem"

function ArtworkExample(props: { artworkID: string; user: User }) {
  return (
    <RootQueryRenderer
      currentUser={props.user}
      query={graphql`
        query SaveArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...GridItem_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState => readyState.props && <GridItem {...readyState.props as any} />}
    />
  )
}

storiesOf("Components/Save Button", module).add("Save Button", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <div style={{ width: "200px" }}>
      <ArtworkExample artworkID="damon-zucconi-tetradic-edit-1" user={user} />
    </div>
  )
})
