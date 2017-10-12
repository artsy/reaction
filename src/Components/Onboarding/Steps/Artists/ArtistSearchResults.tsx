import * as React from "react"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../Relay/config"
import PopularArtistQueryConfig from "../../../../Relay/Queries/PopularArtist"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  searchResults: {
    artists?: any[]
  }
}

export default class ArtistSearchResults extends React.Component<null, null> {
  render() {
    return <ArtistSearchResultsContentList />
  }
}

function ArtistSearchResultsContentList() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={wrappedArtistSearchResultsContent} route={new PopularArtistQueryConfig()} />
}

class ArtistSearchResultsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.searchResults.artists} />
  }
}

const wrappedArtistSearchResultsContent = Relay.createContainer(ArtistSearchResultsContent, {
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
