import { storiesOf } from "@storybook/react"
import React from "react"
import Relay from "react-relay"

import Artwork from "../Artwork/GridItem"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"
import ArtworkQueryConfig from "../../Relay/Queries/Artwork"

function ArtworkExample(props: { artworkID: string; user: User }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Artsy.ContextProvider currentUser={props.user}>
      <Relay.RootContainer Component={Artwork} route={new ArtworkQueryConfig({ artworkID: props.artworkID })} />
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
