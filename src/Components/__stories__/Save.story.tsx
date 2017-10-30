import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { graphql, QueryRenderer } from "react-relay/compat"

import GridItem from "../Artwork/GridItem"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"

function ArtworkExample(props: { artworkID: string; user: User }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Artsy.ContextProvider currentUser={props.user}>
      <QueryRenderer
        environment={Store as any}
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
    </Artsy.ContextProvider>
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
