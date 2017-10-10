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

storiesOf("Components/Rows/Gene", module)
  .add("Gene Row - Artist: Stephen Willats", () => {
    return (
      <div>
        <ArtistExample artistID="stephen-willats" />
      </div>
    )
  })
  .add("Gene Row - Artist: Banksy", () => {
    return (
      <div>
        <ArtistExample artistID="banksy" />
      </div>
    )
  })
  .add("Gene Row - Artist: Glenn Brown", () => {
    return (
      <div>
        <ArtistExample artistID="glenn-brown" />
      </div>
    )
  })

storiesOf("Components/Pages/Gene", module)
  .add("Integration - Minimalism", () => {
    return (
      <div>
        <GeneExample geneID="minimalism" />
      </div>
    )
  })
  .add("Integration - The Fantastic", () => {
    return (
      <div>
        <GeneExample geneID="the-fantastic" />
      </div>
    )
  })
  .add("Integration - Old Master Influenced Fantasy", () => {
    return (
      <div>
        <GeneExample geneID="old-master-influenced-fantasy" />
      </div>
    )
  })
