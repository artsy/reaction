import * as React from "react"
import {ConnectionData, createPaginationContainer,graphql, RelayPaginationProp} from "react-relay"
import styled from "styled-components"
import ArtworkGrid from "../ArtworkGrid"
import Spinner from "../Spinner"

interface Props extends RelayProps {
  relay?: RelayPaginationProp
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const PageSize = 10

export class ArtworksContent extends React.Component<Props, null> {
  loadMoreArtworks() {
    const hasMore = this.props.filtered_artworks.artworks.pageInfo.hasNextPage
    if (hasMore && !this.props.relay.isLoading()) {
      this.props.relay.loadMore(PageSize, error => {
        if (error) {
          console.error(error)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <ArtworkGrid
          artworks={this.props.filtered_artworks.artworks as any}
          columnCount={4}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
        />
        <SpinnerContainer>{this.props.relay.isLoading() ? <Spinner /> : ""}</SpinnerContainer>
      </div>
    )
  }
}

export default createPaginationContainer(
  ArtworksContent,
  {
    filtered_artworks: graphql.experimental`
      fragment ArtworksContent_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $count, after: $cursor, sort: $sort) @connection(key: "ArtworksContent_filtered_artworks") {
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
    query: graphql.experimental`
      query ArtworksContentQuery(
        $filteredArtworksNodeID: ID!
        $count: Int!
        $cursor: String
        $sort: String
      ) {
        node(__id: $filteredArtworksNodeID) {
          ...ArtworksContent_filtered_artworks @arguments(
            count: $count,
            cursor: $cursor,
          )
        }
      }
    `,
  }
)

interface RelayProps {
  filtered_artworks: {
    artworks: {
      edges: Array<{}>
      pageInfo: {
        hasNextPage: boolean
      }
    }
  }
}
