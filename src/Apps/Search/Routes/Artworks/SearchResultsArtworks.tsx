import { Box, Spacer } from "@artsy/palette"
import { SearchResultsArtworks_viewer } from "__generated__/SearchResultsArtworks_viewer.graphql"
import { PaginationFragmentContainer as Pagination } from "Components/v2"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsArtworks_viewer
  relay: RelayRefetchProp
}

const PAGE_SIZE = 10

export class SearchResultsArtworksRoute extends React.Component<
  Props,
  LoadingAreaState
> {
  state = {
    isLoading: false,
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  loadNext = () => {
    const { viewer } = this.props
    const { search: searchConnection } = viewer

    const {
      pageInfo: { hasNextPage, endCursor },
    } = searchConnection

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        before: null,
        last: null,
      },
      null,
      error => {
        this.toggleLoading(false)

        if (error) {
          console.error(error)
        }
      }
    )
  }

  render() {
    const { viewer } = this.props
    const { search: searchConnection } = viewer

    const artworks = get(viewer, v => v.search.edges, []).map(e => e.node)
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {artworks.map((artwork, index) => {
          return (
            <Box key={index}>
              {artwork.title}, {artwork.date} by {artwork.artist_names}
              <Spacer mb={3} />
            </Box>
          )
        })}
        <Pagination
          pageCursors={searchConnection.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
          scrollTo="#jumpto--searchResultTabs"
          hasNextPage={searchConnection.pageInfo.hasNextPage}
        />
      </LoadingArea>
    )
  }
}

export const SearchResultsArtworksRouteFragmentContainer = createRefetchContainer(
  SearchResultsArtworksRoute,
  {
    viewer: graphql`
      fragment SearchResultsArtworks_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        search(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          entities: [ARTWORK]
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              ... on Artwork {
                title
                artist_names
                date
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsArtworksQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
    ) {
      viewer {
        ...SearchResultsArtworks_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
          )
      }
    }
  `
)
