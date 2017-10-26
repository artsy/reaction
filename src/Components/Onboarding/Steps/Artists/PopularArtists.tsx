import * as React from "react"
import * as Relay from "react-relay/classic"
import { createFragmentContainer, graphql } from "react-relay/compat"

import PopularArtistQueryConfig from "../../../../Relay/Queries/PopularArtist"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  popular_artists: {
    artists?: any[]
  }
}

class PopularArtistsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.popular_artists.artists} />
  }
}

const wrappedPopularArtistContent = createFragmentContainer(
  PopularArtistsContent,
  graphql`
    fragment PopularArtistsContent_popular_artists on PopularArtists {
      artists {
        ...SelectableItemContainer_artists
      }
    }
  `
)

export default function PopularArtistContentList() {
  return <Relay.RootContainer Component={wrappedPopularArtistContent} route={new PopularArtistQueryConfig()} />
}
