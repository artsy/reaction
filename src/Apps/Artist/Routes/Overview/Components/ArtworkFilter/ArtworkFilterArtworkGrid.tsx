import { ArtworkFilterArtworkGrid_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { AppState } from "Router/state"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

interface Props {
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  relay: RelayRefetchProp
  artistID: string
  columnCount: number
  filters: any
}

const PAGE_SIZE = 10

class Artworks extends Component<Props, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      filtered_artworks: {
        artworks: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

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
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
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

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const {
            mediator,
            system: { currentUser },
          } = state

          return (
            <LoadingArea isLoading={this.state.isLoading}>
              <ArtworkGrid
                artworks={this.props.filtered_artworks.artworks as any}
                columnCount={this.props.columnCount}
                itemMargin={40}
                currentUser={currentUser}
                mediator={mediator}
              />

              <Spacer mb={3} />

              <Box>
                <Pagination
                  hasNextPage={
                    this.props.filtered_artworks.artworks.pageInfo.hasNextPage
                  }
                  pageCursors={
                    this.props.filtered_artworks.artworks.pageCursors as any
                  }
                  onClick={this.loadAfter}
                  onNext={this.loadNext}
                  scrollTo="#jump--artistArtworkGrid"
                />
              </Box>
            </LoadingArea>
          )
        }}
      </Subscribe>
    )
  }
}

export const ArtworkGridRefetchContainer = createRefetchContainer(
  Artworks,
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
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
