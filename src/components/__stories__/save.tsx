import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "../artwork/grid_item"
import SaveButton from "../artwork/save"

import { artsyNetworkLayer } from "../../relay/config"
import ArtworkQueryConfig from "../../relay/queries/artwork"

function ArtworkExample(props: { artworkID: string, user?: any }) {
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return <Relay.RootContainer Component={Artwork} route={new ArtworkQueryConfig({ artworkID: props.artworkID })} />
}

storiesOf("Save Button", SaveButton)
  .add("Save Button (logged in)", () => {
    return (
      <div style={{width: "200px"}}>
        <ArtworkExample
          artworkID="damon-zucconi-tetradic-edit-1"
        />
      </div>
    )
  })
