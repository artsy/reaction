import * as React from "react"
import * as Relay from "react-relay"

import { ArtistSearchQueryConfig } from "../../../../Relay/Queries/ArtistSearch"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  viewer: {
    match_artist: any[]
  }
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

interface Props {
  term: string
}

export const ArtistSearchResults: React.SFC<Props> = ({ term }) => {
  return (
    <Relay.RootContainer Component={wrappedArtistSearchResultsContent} route={new ArtistSearchQueryConfig({ term })} />
  )
}
