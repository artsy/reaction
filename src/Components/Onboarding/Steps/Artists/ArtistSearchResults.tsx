import * as React from "react"
import { Store } from "react-relay/classic"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay/compat"
import { Environment } from "relay-runtime"

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

export const ArtistSearchResults: React.SFC<Props> = ({ term }) => {
  return (
    <QueryRenderer
      environment={(Store as any) as Environment}
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
          return <ArtistSearchResultsContentContainer viewer={props.viewer} />
        } else {
          return null
        }
      }}
    />
  )
}
