import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay/compat"

import { ContextConsumer, ContextProps } from "../../../Artsy"
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
