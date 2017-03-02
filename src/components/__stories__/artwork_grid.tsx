import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "../artwork/index"
import ArtworkGrid from "../artwork_grid"

import { artsyNetworkLayer } from "../../relay/config"
import { ArtistQueryConfig } from "../../relay/root_queries"

export class ArtistArtworks extends React.Component<RelayProps, null> {
  render() {
    return (
      <ArtworkGrid artworks={this.props.artist.artworks} />
    )
  }
}

const ArtistArtworksContainer = Relay.createContainer(ArtistArtworks, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artworks: artworks_connection(first: 10) {
          edges {
            node {
              id
              image {
                aspect_ratio
              }
              ${Artwork.getFragment("artwork")}
            }
          }
        }
      }
    `,
  },
})

interface RelayProps {
  artist: {
    artworks: Array<{
      __id: string,
    } | null> | null,
  }
}

function GridExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer
    Component={ArtistArtworksContainer}
    route={new ArtistQueryConfig({ artistID: props.artistID })} />
}

storiesOf("ArtworkGrid", ArtworkGrid)
  .add("A typical grid", () => (
    <GridExample artistID="banksy" />
  ))
