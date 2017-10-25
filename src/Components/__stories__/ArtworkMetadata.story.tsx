import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import ArtworkMetadata from "../Artwork/Metadata"

import { artsyNetworkLayer } from "../../Relay/config"
import ArtworkQueryConfig from "../../Relay/Queries/Artwork"

function ArtworkMetadataGenerator(data) {
  return <ArtworkMetadata {...data} extended />
}

function ArtworkExample(props: { artworkID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      renderFetched={ArtworkMetadataGenerator}
      Component={ArtworkMetadata}
      route={new ArtworkQueryConfig({ artworkID: props.artworkID })}
    />
  )
}

storiesOf("Components/Artwork/Metadata", module)
  .add("A NFS artwork", () => <ArtworkExample artworkID="andy-warhol-skull" />)
  .add("A for-sale artwork with exact price", () => <ArtworkExample artworkID="stephen-berkman-a-history-of-dread" />)
