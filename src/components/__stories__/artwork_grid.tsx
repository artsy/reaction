import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import ArtworkGrid from "../artwork_grid"

import { artsyNetworkLayer } from "../../relay/config"
import { ArtistQueryConfig } from "../../relay/root_queries"

function GridExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={ArtworkGrid} route={new ArtistQueryConfig({ artistID: props.artistID })} />
}

storiesOf("ArtworkGrid", ArtworkGrid)
  .add("A typical grid", () => (
    <GridExample artistID="banksy" />
  ))
