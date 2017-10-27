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

function FillwidthExample(props: { artistID: string; user: User }) {
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Relay.RootContainer Component={FillwidthContainer} route={new ArtistQueryConfig({ artistID: props.artistID })} />
  )
}

storiesOf("Components/Artworks/Fillwidth", module).add("A typical fillwidth", () => {
  const user = {
    id: "547c73d57261692d83d70000",
    accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDdjNzNkNTcyNjE2OTJkODNkNzAwMDAiLCJzYWx0X2hhc2giOiJhMzkxZmU2NzBlYWY3MDJlZGViMmNjODk3YTk3ZTQyNSIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE0MjA4Nzg3LCJpYXQiOjE1MDkwMjQ3ODcsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1OWYxZTQxMzhiM2I4MTU4ZjgwZjYxNjYifQ.yK6ise21DS0ohlpqPllMacd9prqGpccraeziiS-V4MY",
  } as User
  return (
    <Artsy.ContextProvider currentUser={user}>
      <FillwidthExample artistID="stephen-willats" user={user} />
    </Artsy.ContextProvider>
  )
})
