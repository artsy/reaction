import { Box, Separator, Spacer } from "@artsy/palette"
import { SearchResultsAuctions_viewer } from "__generated__/SearchResultsAuctions_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"

import { PaginationFragmentContainer as Pagination } from "Components/v2"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsAuctions_viewer
  relay: RelayRefetchProp
}

const PAGE_SIZE = 10

export class SearchResultMoreRoute extends React.Component<
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

    const items = get(viewer, v => v.search.edges, []).map(e => e.node)
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {items.map((searchableItem, index) => {
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={searchableItem.displayLabel}
                href={searchableItem.href}
                imageUrl={searchableItem.imageUrl}
                entityType={searchableItem.searchableType}
              />
              {index < items.length - 1 ? (
                <>
                  <Spacer mb={3} />
                  <Separator />
                  <Spacer mb={3} />
                </>
              ) : (
                <Spacer mb={3} />
              )}
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

export const SearchResultsMoreRouteRouteFragmentContainer = createRefetchContainer(
  SearchResultMoreRoute,
  {
    viewer: graphql`
      fragment SearchResultsMore_viewer on Viewer
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
          entities: [TAG, CITY, FAIR, FEATURE]
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
              ... on SearchableItem {
                id
                displayLabel
                href
                imageUrl
                searchableType
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsMoreQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
    ) {
      viewer {
        ...SearchResultsMore_viewer
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
