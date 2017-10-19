import * as React from "react"
import * as Relay from "react-relay"

import { ArtistSearchQueryConfig } from "../../../../Relay/Queries/ArtistSearch"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  viewer: {
    match_artist: any[]
  }
}

// export default class ArtistSearchResults extends React.Component<any, any> {
//   render() {
//     return <ArtistSearchResultsContentList />
//   }
// }

export default function ArtistSearchResultsContentList() {
  return (
    <Relay.RootContainer
      Component={wrappedArtistSearchResultsContent}
      route={new ArtistSearchQueryConfig({ term: "andy" })}
    />
  )
}

class ArtistSearchResultsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.viewer.match_artist} />
  }
}

const wrappedArtistSearchResultsContent = Relay.createContainer(ArtistSearchResultsContent, {
  initialVariables: {
    term: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        match_artist(term: $term) {
          ${SelectableItemContainer.getFragment("artists")}
        }
      }
    `,
  },
})
