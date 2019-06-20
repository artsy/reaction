import { Box, Spacer } from "@artsy/palette"
import { useSystemContext } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { useState } from "react"
import { createRefetchContainer, graphql } from "react-relay"
import { LoadingArea } from "../LoadingArea"
import { Pagination } from "../Pagination"
import { useFilterContext } from "./ArtworkFilterContext"
import { ArtworkFilterZeroState } from "./ArtworkFilterZeroState"

export const ArtworkFilterArtworkGridRefetchContainer = createRefetchContainer(
  props => {
    const {
      columnCount,
      filtered_artworks: { artworks },
      term,
    } = props

    const [isLoading, setLoading] = useState(false)
    const { user, mediator } = useSystemContext()
    const context = useFilterContext()

    return (
      <LoadingArea isLoading={isLoading || props.isLoading}>
        <ArtworkGrid
          artworks={artworks as any}
          columnCount={columnCount}
          preloadImageCount={9}
          itemMargin={40}
          user={user}
          mediator={mediator}
          onClearFilters={context.resetFilters}
          emptyStateComponent={<ArtworkFilterZeroState term={term} />}
          // onBrickClick={this.trackBrickClick.bind(this)}
        />

        <Spacer mb={3} />

        {/*
        <Box>
          <Pagination
            hasNextPage={artworks.pageInfo.hasNextPage}
            pageCursors={artworks.pageCursors as any}
            onClick={(cursor, page) => {
              this.loadAfter(cursor, page, context)
            }}
            onNext={() => {
              this.loadNext(context)
            }}
            scrollTo="#jump--searchArtworkGrid"
          />
        </Box>
        */}
      </LoadingArea>
    )
  },
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworks
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
    query ArtworkFilterArtworkGrid2Query(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid2_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
