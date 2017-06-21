import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "../artwork/grid_item"
import SaveButton from "../artwork/save"

import * as Artsy from "../../components/artsy"
import { artsyNetworkLayer } from "../../relay/config"
import ArtworkQueryConfig from "../../relay/queries/artwork"

function ArtworkExample(props: { artworkID: string, user: User }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Artsy.ContextProvider currentUser={props.user}>
      <Relay.RootContainer Component={Artwork} route={new ArtworkQueryConfig({ artworkID: props.artworkID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Save Button", SaveButton)
  .add("Save Button", () => {
    const user = {
      id: "some-id",
      accessToken: "some-token",
    } as User
    return (
      <div style={{width: "200px"}}>
        <ArtworkExample
          artworkID="damon-zucconi-tetradic-edit-1"
          user={user}
        />
      </div>
    )
  })
