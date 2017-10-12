import * as React from "react"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../../../../Relay/config"
import ArtistSearchQueryConfig from "../../../../Relay/Queries/ArtistSearchResults"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  searchResults: any[]
}

export default class ArtistSearchResults extends React.Component<any, any> {
  render() {
    return <ArtistSearchResultsContentList />
  }
}

function ArtistSearchResultsContentList() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Relay.RootContainer
      Component={wrappedArtistSearchResultsContent}
      route={new ArtistSearchQueryConfig({ term: "andy" })}
    />
  )
}

class ArtistSearchResultsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.searchResults} />
  }
}

const wrappedArtistSearchResultsContent = Relay.createContainer(ArtistSearchResultsContent, {
  fragments: {
    searchResults: () => Relay.QL`
      fragment on Artist @relay(plural: true) {
        ${SelectableItemContainer.getFragment("artists")}
      }
    `,
  },
})
