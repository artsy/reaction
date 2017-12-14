import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  term: string
  viewer: {
    match_artist: any[]
  }
}

class ArtistSearchResultsContent extends React.Component<RelayProps, null> {
  onArtistFollowed(artistId: string, store: RecordSourceSelectorProxy, data: SelectorData): void {
    const suggestedArtist = store.get(data.followArtist.artist.related.suggested.edges[0].node.__id)

    const popularArtistsRootField = store.get("client:root:viewer")
    const popularArtists = popularArtistsRootField.getLinkedRecords("match_artist", { term: this.props.term })
    const updatedPopularArtists = popularArtists.map(popularArtist =>
      popularArtist.getDataID() === artistId ? suggestedArtist : popularArtist)

    popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "match_artist", { term: this.props.term })
  }

  render() {
    return <SelectableItemContainer
              artists={this.props.viewer.match_artist}
              onArtistFollowed={this.onArtistFollowed.bind(this)} />
  }
}

const ArtistSearchResultsContentContainer = createFragmentContainer(
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

const ArtistSearchResultsComponent: React.SFC<Props & ContextProps> = ({ term, relayEnvironment }) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query ArtistSearchResultsQuery($term: String!) {
          viewer {
            ...ArtistSearchResultsContent_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return <ArtistSearchResultsContentContainer viewer={props.viewer} term={term} />
        } else {
          return null
        }
      }}
    />
  )
}

export const ArtistSearchResults = ContextConsumer(ArtistSearchResultsComponent)
