import * as React from "react"
import { Store } from "react-relay/classic"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay/compat"
import { Environment } from "relay-runtime"

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

export default function PopularArtistContentList() {
  return (
    <QueryRenderer
      environment={(Store as any) as Environment}
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
