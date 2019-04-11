import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { SystemContextConsumer } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/v2"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"

import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"

interface Props {
  artistID: string
  columnCount: number | number[]
  filters: any
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  filterState?: FilterState
  isLoading?: boolean
  relay: RelayRefetchProp
}

const PAGE_SIZE = 24

class Artworks extends Component<Props, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = (filters, mediator) => {
    const {
      filtered_artworks: {
        artworks: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor, filters.state.page + 1, filters, mediator)
    }
  }

  loadAfter = (cursor, page, filters, mediator) => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
      },
      null,
      error => {
        this.toggleLoading(false)
        filters.setPage(page, mediator)
        if (error) {
          console.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  componentDidUpdate(prevProps) {
    const prevCount = prevProps.filtered_artworks.artworks.edges.length
    const count = this.props.filtered_artworks.artworks.edges.length

    if (prevCount !== count) {
      const shouldShow = count === 0 ? true : false
      this.props.filterState.showZeroState(shouldShow)
    }
  }

  render() {
    const { filterState } = this.props

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => (
          <LoadingArea isLoading={this.state.isLoading || this.props.isLoading}>
            <ArtworkGrid
              artworks={this.props.filtered_artworks.artworks}
              columnCount={this.props.columnCount}
              itemMargin={40}
              user={user}
              mediator={mediator}
              onClearFilters={filterState.resetFilters}
            />

            <Spacer mb={3} />

            <Box>
              <Pagination
                hasNextPage={
                  this.props.filtered_artworks.artworks.pageInfo.hasNextPage
                }
                pageCursors={this.props.filtered_artworks.artworks.pageCursors}
                onClick={(cursor, page) => {
                  this.loadAfter(cursor, page, filterState, mediator)
                }}
                onNext={() => {
                  this.loadNext(filterState, mediator)
                }}
                scrollTo="#jump--artistArtworkGrid"
              />
            </Box>
          </LoadingArea>
        )}
      </SystemContextConsumer>
    )
  }
}

export const ArtworkGridRefetchContainer = createRefetchContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return <Artworks filterState={filters} {...props} />
        }}
      </Subscribe>
    )
  },
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 24 }
          after: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
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
  graphql`
    query ArtworkFilterArtworkGridQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
