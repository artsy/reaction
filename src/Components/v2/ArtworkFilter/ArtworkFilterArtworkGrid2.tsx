import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid2_filteredArtworks } from "__generated__/ArtworkFilterArtworkGrid2_filteredArtworks.graphql"
import { AnalyticsSchema, useSystemContext, useTracking } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { LoadingArea } from "../LoadingArea"
import { PaginationFragmentContainer as Pagination } from "../Pagination"
import { useFilterContext } from "./ArtworkFilterContext"
import { ArtworkFilterZeroState } from "./ArtworkFilterZeroState"

// TODO: Wire up
// import { SortFilter } from "./ArtworkFilterArtworkGridSort"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filteredArtworks: ArtworkFilterArtworkGrid2_filteredArtworks
  isLoading?: boolean
  relay: RelayRefetchProp

  // FIXME: This varies across different apps
  keyword?: string
}

const ArtworkFilterArtworkGrid: React.FC<
  ArtworkFilterArtworkGridProps
> = props => {
  const { trackEvent } = useTracking()
  const { user, mediator } = useSystemContext()
  const context = useFilterContext()

  const {
    columnCount,
    filteredArtworks: { artworks },
    keyword,
  } = props

  const {
    pageInfo: { hasNextPage },
  } = artworks

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      loadPage(context.filters.page + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadPage(page) {
    context.setFilter("page", page)
  }

  return (
    <>
      {/*
        // TODO: Wire up sort filter, depending on needs (collect, collections, artist; not search)

        <Box pb={2}>
          <SortFilter />
        </Box>
      */}
      <LoadingArea isLoading={props.isLoading}>
        <ArtworkGrid
          artworks={artworks as any}
          columnCount={columnCount}
          preloadImageCount={9}
          itemMargin={40}
          user={user}
          mediator={mediator}
          onClearFilters={context.resetFilters}
          emptyStateComponent={<ArtworkFilterZeroState keyword={keyword} />}
          onBrickClick={artwork => {
            trackEvent({
              // FIXME: Figure out how to pass in granular tracking to grid
              action_type:
                AnalyticsSchema.ActionType.SelectedItemFromSearchPage,
              query: props.keyword,
              item_type: "Artwork",
              item_id: artwork.id,
              destination_path: artwork.href,
            })
          }}
        />

        <Spacer mb={3} />

        <Box>
          <Pagination
            hasNextPage={artworks.pageInfo.hasNextPage}
            pageCursors={artworks.pageCursors as any}
            onClick={(_cursor, page) => loadPage(page)}
            onNext={() => loadNext()}
            scrollTo="#jump--searchArtworkGrid"
          />
        </Box>
      </LoadingArea>
    </>
  )
}

export const ArtworkFilterArtworkGridRefetchContainer = createRefetchContainer(
  ArtworkFilterArtworkGrid,
  {
    filteredArtworks: graphql`
      fragment ArtworkFilterArtworkGrid2_filteredArtworks on FilterArtworks
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
          edges {
            node {
              __id
            }
          }
          ...ArtworkGrid_artworks
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
      filteredArtworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid2_filteredArtworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
