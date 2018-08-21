import { WorksForYouArtist_viewer } from "__generated__/WorksForYouArtist_viewer.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import * as React from "react"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

interface Props {
  relay?: RelayPaginationProp
  viewer: WorksForYouArtist_viewer
  artistID: string
}

interface State {
  loading: boolean
}

const PageSize = 10

export class WorksForYouArtist extends React.Component<Props, State> {
  state = { loading: false }

  loadMoreArtworks() {
    const hasMore = this.props.viewer.artist.artworks_connection.pageInfo
      .hasNextPage

    if (hasMore && !this.state.loading) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          if (error) {
            console.error(error)
          }

          this.setState({ loading: false })
        })
      })
    }
  }

  render() {
    return (
      <ArtworkGrid
        artworks={this.props.viewer.artist.artworks_connection}
        columnCount={4}
        itemMargin={40}
        onLoadMore={() => this.loadMoreArtworks()}
      />
    )
  }
}

export default createPaginationContainer(
  WorksForYouArtist,
  {
    viewer: graphql`
      fragment WorksForYouArtist_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          artistID: { type: "String!", defaultValue: "" }
          filter: {
            type: "[ArtistArtworksFilters]"
            defaultValue: [IS_FOR_SALE]
          }
        ) {
        artist(id: $artistID) {
          name
          artworks_connection(
            sort: published_at_desc
            first: $count
            after: $cursor
            filter: $filter
          ) @connection(key: "WorksForYouArtist_artworks_connection") {
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
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer.artist.artworks_connection as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query WorksForYouArtistPaginationQuery(
        $artistID: String!
        $count: Int!
        $cursor: String
        $filter: [ArtistArtworksFilters]
      ) {
        viewer {
          ...WorksForYouArtist_viewer
            @arguments(
              artistID: $artistID
              count: $count
              cursor: $cursor
              filter: $filter
            )
        }
      }
    `,
  }
)
