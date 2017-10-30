import { storiesOf } from "@storybook/react"
import React from "react"
import Relay from "react-relay"

import ArtworkGrid from "../ArtworkGrid"

import { artsyNetworkLayer } from "../../Relay/config"
import ArtistQueryConfig from "../../Relay/Queries/Artist"
import * as Artsy from "../Artsy"

export class ArtistArtworks extends React.Component<RelayProps, null> {
  render() {
    return <ArtworkGrid artworks={this.props.artist.artworks as any} />
  }
}

const ArtistArtworksContainer = Relay.createContainer(ArtistArtworks, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artworks: artworks_connection(first: 10) {
          ${ArtworkGrid.getFragment("artworks")}
        }
      }
    `,
  },
})

interface RelayProps {
  artist: {
    artworks: Array<any | null> | null
  }
}

function GridExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      Component={ArtistArtworksContainer}
      route={new ArtistQueryConfig({ artistID: props.artistID })}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module).add("A typical grid", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <GridExample artistID="banksy" />
    </Artsy.ContextProvider>
  )
})
