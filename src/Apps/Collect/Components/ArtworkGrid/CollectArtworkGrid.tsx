import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { ContextConsumer } from "Artsy/Router"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Subscribe } from "unstated"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

interface Props {
  columnCount: number
  filters: any
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
}

const PAGE_SIZE = 30

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

  render() {
    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <LoadingArea
                    isLoading={this.state.isLoading || this.props.isLoading}
                  >
                    <ArtworkGrid
                      artworks={this.props.filtered_artworks.artworks as any}
                      columnCount={this.props.columnCount}
                      itemMargin={40}
                      user={user}
                      mediator={mediator}
                    />

                    <Spacer mb={3} />

                    <Box>
                      <Pagination
                        hasNextPage={
                          this.props.filtered_artworks.artworks.pageInfo
                            .hasNextPage
                        }
                        pageCursors={
                          this.props.filtered_artworks.artworks
                            .pageCursors as any
                        }
                        onClick={(cursor, page) => {
                          this.loadAfter(cursor, page, filters, mediator)
                        }}
                        onNext={() => {
                          this.loadNext(filters, mediator)
                        }}
                      />
                    </Box>
                  </LoadingArea>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const CollectArtworkGridRefreshContainer = createRefetchContainer(
  Artworks,
  {
    filtered_artworks: graphql`
      fragment CollectArtworkGrid_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
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
    query CollectArtworkGridQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...CollectArtworkGrid_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
