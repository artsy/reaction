import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import ArtworkGrid from "../src/components/artwork_grid"

import { artsyNetworkLayer } from "../src/relay/config"
import { ArtistQueryConfig } from "../src/relay/root_queries"

function GridExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={ArtworkGrid} route={new ArtistQueryConfig({ artistID: props.artistID })} />
}

storiesOf("ArtworkGrid", ArtworkGrid)
  .add("A typical grid", () => (
    <GridExample artistID="banksy" />
  ))
