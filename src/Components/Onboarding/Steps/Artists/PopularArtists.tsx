import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import { ContextConsumer, ContextProps } from "../../../Artsy"
import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  popular_artists: {
    artists?: any[]
  }
}

class PopularArtistsContent extends React.Component<RelayProps, null> {
  onArtistFollowed(artistId: string, store: RecordSourceSelectorProxy, data: SelectorData): void {
    const suggestedArtist = store.get(data.followArtist.artist.related.suggested.edges[0].node.__id)

    const popularArtistsRootField = store.get("client:root:popular_artists")
    const popularArtists = popularArtistsRootField.getLinkedRecords("artists")
    const updatedPopularArtists = popularArtists.map(popularArtist =>
      popularArtist.getDataID() === artistId ? suggestedArtist : popularArtist)

    popularArtistsRootField.setLinkedRecords(updatedPopularArtists, "artists")
  }

  render() {
    return <SelectableItemContainer
              artists={this.props.popular_artists.artists}
              onArtistFollowed={this.onArtistFollowed.bind(this)} />
  }
}

const PopularArtistContentContainer = createFragmentContainer(
  PopularArtistsContent,
  graphql`
    fragment PopularArtistsContent_popular_artists on PopularArtists {
      artists {
        ...SelectableItemContainer_artists
      }
    }
  `
)

const PopularArtistsComponent: React.SFC<ContextProps> = ({ relayEnvironment }) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query PopularArtistsQuery {
          popular_artists {
            ...PopularArtistsContent_popular_artists
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return <PopularArtistContentContainer popular_artists={props.popular_artists} />
        } else {
          return null
        }
      }}
    />
  )
}

export const PopularArtists = ContextConsumer(PopularArtistsComponent)
