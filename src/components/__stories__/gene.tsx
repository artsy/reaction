import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import ArtistRow from "../gene/artist_row"
import GeneContent from "../gene/index"

import * as Artsy from "../../components/artsy"
import { artsyNetworkLayer } from "../../relay/config"
import ArtistQueryConfig from "../../relay/queries/artist"
import GeneQueryConfig from "../../relay/queries/gene"

function GeneExample(props: { geneID: string }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Artsy.ContextProvider>
      <Relay.RootContainer Component={GeneContent} route={new GeneQueryConfig({ geneID: props.geneID })} />
    </Artsy.ContextProvider>
  )
}

function ArtistExample(props: { artistID: string }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Artsy.ContextProvider>
      <Relay.RootContainer Component={ArtistRow} route={new ArtistQueryConfig({ artistID: props.artistID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Gene", GeneContent)
  .add("Artist row", () => {
    return (
      <div>
        <ArtistExample
          artistID="stephen-willats"
        />
      </div>
    )
  })
  .add("Gene page (integration)", () => {
    return (
      <div>
        <GeneExample
          geneID="minimalism"
        />
      </div>
    )
  })
