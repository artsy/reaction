import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay/classic"

import Fillwidth from "../Artwork/Fillwidth"

import { artsyNetworkLayer } from "../../Relay/config"
import ArtistQueryConfig from "../../Relay/Queries/Artist"
import * as Artsy from "../Artsy"

export class FillwidthArtistArtworks extends React.Component<RelayProps, null> {
  render() {
    return <Fillwidth artworks={this.props.artist.artworks as any} />
  }
}

const FillwidthContainer = Relay.createContainer(FillwidthArtistArtworks, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        artworks: artworks_connection(first: 6) {
          ${Fillwidth.getFragment("artworks")}
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

function FillwidthExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer Component={FillwidthContainer} route={new ArtistQueryConfig({ artistID: props.artistID })} />
  )
}

storiesOf("Components/Artworks/Fillwidth", module).add("A typical fillwidth", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <FillwidthExample artistID="stephen-willats" />
    </Artsy.ContextProvider>
  )
})
