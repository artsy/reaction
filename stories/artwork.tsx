import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import Artwork from "../src/artwork"

import { artsyNetworkLayer } from "../src/relay/config"
import { ArtworkQueryConfig } from "../src/relay/root_queries"

storiesOf("Artwork", Artwork)
  .add("Hello World", () => {
    Relay.injectNetworkLayer(artsyNetworkLayer())
    const artworkRoute = new ArtworkQueryConfig({ artworkID: "hieronymus-bosch-the-garden-of-earthly-delights-2" })
    return <Relay.RootContainer Component={Artwork} route={artworkRoute} />
  })
