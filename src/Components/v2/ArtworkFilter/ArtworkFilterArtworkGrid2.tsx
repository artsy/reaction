import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid2_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid2_filtered_artworks.graphql"
import { AnalyticsSchema, useSystemContext, useTracking } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { useEffect, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { LoadingArea } from "../LoadingArea"
import { PaginationFragmentContainer as Pagination } from "../Pagination"
import { useFilterContext } from "./ArtworkFilterContext"
import { ArtworkFilterZeroState } from "./ArtworkFilterZeroState"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filtered_artworks: ArtworkFilterArtworkGrid2_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
  term: string
}

const RefetchPageSize = 30

const ArtworkFilterArtworkGrid: React.FC<
  ArtworkFilterArtworkGridProps
> = props => {
  const { trackEvent } = useTracking()
  const { user, mediator } = useSystemContext()
  const [isLoading, setLoading] = useState(false)
  const context = useFilterContext()

  const {
    columnCount,
    filtered_artworks: { artworks },
    relay,
    term,
  } = props

  const {
    pageInfo: { hasNextPage, endCursor },
  } = artworks

  /**
   * Scroll to top of page on load
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [isLoading])

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      loadAfter(endCursor, context.filters.page + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadAfter(cursor, page) {
    setLoading(true)

    relay.refetch(
      {
        first: RefetchPageSize,
        after: cursor,
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
      },
      null,
      error => {
        setLoading(false)
        context.setFilter("page", page)
        if (error) {
          console.error(error)
        }
      }
    )
  }

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
        onBrickClick={artwork => {
          trackEvent({
            // FIXME: Figure out how to pass in granular tracking to grid
            action_type: AnalyticsSchema.ActionType.SelectedItemFromSearchPage,
            query: props.term,
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
          onClick={(cursor, page) => loadAfter(cursor, page)}
          onNext={() => loadNext()}
          scrollTo="#jump--searchArtworkGrid"
        />
      </Box>
    </LoadingArea>
  )
}

export const ArtworkFilterArtworkGridRefetchContainer = createRefetchContainer(
  ArtworkFilterArtworkGrid,
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
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid2_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
