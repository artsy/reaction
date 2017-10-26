import * as React from "react"
import * as Relay from "react-relay/classic"
import { createFragmentContainer, graphql } from "react-relay/compat"

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

const wrappedArtistSearchResultsContent = createFragmentContainer(
  ArtistSearchResultsContent,
  graphql`
    fragment ArtistSearchResultsContent_viewer on Viewer {
      match_artist(term: $term) {
        ...SelectableItemContainer_artists
      }
    }
  `
)

interface Props {
  term: string
}

export const ArtistSearchResults: React.SFC<Props> = ({ term }) => {
  return (
    <Relay.RootContainer Component={wrappedArtistSearchResultsContent} route={new ArtistSearchQueryConfig({ term })} />
  )
}
