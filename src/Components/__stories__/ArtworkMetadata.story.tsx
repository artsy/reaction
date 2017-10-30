import { storiesOf } from "@storybook/react"
import * as React from "react"
import { injectNetworkLayer, Store } from "react-relay/classic"
import { graphql, QueryRenderer } from "react-relay/compat"

import Metadata from "../Artwork/Metadata"

import { artsyNetworkLayer } from "../../Relay/config"

function ArtworkExample(props: { artworkID: string }) {
  injectNetworkLayer(artsyNetworkLayer())
  return (
    <QueryRenderer
      environment={Store as any}
      query={graphql`
        query ArtworkMetadataQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Metadata_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState => readyState.props && <Metadata {...readyState.props as any} />}
    />
  )
}

storiesOf("Components/Artwork/Metadata", module)
  .add("A not-for-sale artwork", () => <ArtworkExample artworkID="andy-warhol-skull" />)
  .add("A for-sale artwork with exact price", () => <ArtworkExample artworkID="stephen-berkman-a-history-of-dread" />)
