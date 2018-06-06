import * as React from "react"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { Subscribe } from "unstated"

import { FilterState } from "./state"
import ArtworkGrid from "../ArtworkGrid"

import { Artworks_filtered_artworks } from "../../__generated__/Artworks_filtered_artworks.graphql"

interface Props {
  filtered_artworks: Artworks_filtered_artworks
  relay: RelayPaginationProp
  artistID: string
}

const PAGE_SIZE = 10

class Artworks extends React.Component<Props> {
  loadMoreArtworks(filters) {
    const hasMore = this.props.filtered_artworks.artworks.pageInfo.hasNextPage
    const endCursor = this.props.filtered_artworks.artworks.pageInfo.endCursor
    if (hasMore) {
      // TODO: Should refetchConnection keep appending records?
      this.props.relay.refetchConnection(
        PAGE_SIZE,
        error => {
          if (error) {
            console.error(error)
          }
          filters.incrementPage()
        },
        { cursor: endCursor }
      )
    }
  }
  renderPagination(filters) {
    return (
      <div>
        <div>Current Page: {filters.state.page}</div>
        <div
          onClick={() => {
            this.loadMoreArtworks(filters)
          }}
        >
          Next
        </div>
      </div>
    )
  }

  render() {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return (
            <div>
              {this.renderPagination(filters)}
              <ArtworkGrid
                artworks={this.props.filtered_artworks.artworks as any}
                columnCount={4}
                itemMargin={40}
              />
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default createPaginationContainer(
  Artworks,
  {
    filtered_artworks: graphql`
      fragment Artworks_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $count, after: $cursor)
          @connection(key: "Artworks_filtered_artworks") {
          pageInfo {
            hasNextPage
            endCursor
          }
          ...ArtworkGrid_artworks
          edges {
            node {
              __id
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.filtered_artworks.artworks as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        filteredArtworksNodeID: props.filtered_artworks.__id,
      }
    },
    query: graphql`
      query ArtworksQuery(
        $filteredArtworksNodeID: ID!
        $count: Int!
        $cursor: String
      ) {
        node(__id: $filteredArtworksNodeID) {
          ...Artworks_filtered_artworks
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
