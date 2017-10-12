import * as React from "react"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../Relay/config"
import PopularArtistQueryConfig from "../../../../Relay/Queries/PopularArtist"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  popular_artists: {
    artists?: any[]
  }
}

export default class PopularArtists extends React.Component<null, null> {
  render() {
    return <PopularArtistContentList />
  }
}

function PopularArtistContentList() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={wrappedPopularArtistContent} route={new PopularArtistQueryConfig()} />
}

class PopularArtistsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.popular_artists.artists} />
  }
}

const wrappedPopularArtistContent = Relay.createContainer(PopularArtistsContent, {
  fragments: {
    popular_artists: () => Relay.QL`
      fragment on PopularArtists {
        artists {
          ${SelectableItemContainer.getFragment("artists")}
        }
      }
    `,
  },
})
