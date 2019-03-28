import { Box, Separator, Spacer } from "@artsy/palette"
import { SearchResultsAuctions_viewer } from "__generated__/SearchResultsAuctions_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"

import { ZeroState } from "Apps/Search/Components/ZeroState"
import { PaginationFragmentContainer as Pagination } from "Components/v2"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import { Location } from "found"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "Utils/get"

export interface Props {
  viewer: SearchResultsAuctions_viewer
  relay: RelayRefetchProp
  location: Location
}

const PAGE_SIZE = 10

export class SearchResultAuctionsRoute extends React.Component<
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

  renderAuctions() {
    const { viewer, location } = this.props
    const { term } = get(location, l => l.query)
    const { search: searchConnection } = viewer

    const sales = get(viewer, v => v.search.edges, []).map(e => e.node)

    return (
      <>
        {sales.map((searchableItem, index) => {
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={searchableItem.displayLabel}
                description={searchableItem.description}
                href={searchableItem.href}
                imageUrl={searchableItem.imageUrl}
                entityType={searchableItem.displayType}
                index={index}
                term={term}
                id={searchableItem._id}
              />
              {index < sales.length - 1 ? (
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
      </>
    )
  }

  render() {
    const { viewer, location } = this.props
    const { term } = get(location, l => l.query)

    const sales = get(viewer, v => v.search.edges, []).map(e => e.node)
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {sales.length === 0 ? (
          <ZeroState entity="auctions" term={term} />
        ) : (
          this.renderAuctions()
        )}
      </LoadingArea>
    )
  }
}

export const SearchResultsAuctionsRouteRouteFragmentContainer = createRefetchContainer(
  SearchResultAuctionsRoute,
  {
    viewer: graphql`
      fragment SearchResultsAuctions_viewer on Viewer
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
          entities: [SALE]
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
                description
                displayLabel
                href
                _id
                imageUrl
                displayType
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsAuctionsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
    ) {
      viewer {
        ...SearchResultsAuctions_viewer
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
