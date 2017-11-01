import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../../../Artsy"
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
          return <ArtistSearchResultsContentContainer viewer={props.viewer} />
        } else {
          return null
        }
      }}
    />
  )
}

export const ArtistSearchResults = ContextConsumer(ArtistSearchResultsComponent)
