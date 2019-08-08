import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkFilter } from "Components/v2/ArtworkFilter"

import {
  FilterContextProvider,
  initialFilterState,
} from "Components/v2/ArtworkFilter/ArtworkFilterContext"

export const CollectionArtworkFilter = props => {
  // FIXME: Need to pass proper relay context in for refetch
  return (
    <FilterContextProvider filters={initialFilterState}>
      <ArtworkFilter {...props} />
    </FilterContextProvider>
  )
}

export const CollectionArtworkFilterFragmentContainer = createFragmentContainer(
  CollectionArtworkFilter,
  {
    viewer: graphql`
      fragment CollectionArtworkFilter_viewer on MarketingCollection
        @argumentDefinitions(
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
          }
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          partner_id: { type: "ID" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          color: { type: "String" }
          page: { type: "Int" }
        ) {
        artworks(
          aggregations: $aggregations
          include_medium_filter_in_aggregation: true
          sort: "-decayed_merch"
          size: 12
        ) {
          aggregations {
            slice
            counts {
              id
              name
              count
            }
          }
        }

        slug

        filteredArtworks: artworks(
          acquireable: $acquireable
          aggregations: [TOTAL]
          at_auction: $at_auction
          color: $color
          for_sale: $for_sale
          height: $height
          inquireable_only: $inquireable_only
          major_periods: $major_periods
          medium: $medium
          offerable: $offerable
          page: $page
          partner_id: $partner_id
          price_range: $price_range
          size: 0
          sort: $sort
          width: $width
        ) {
          ...ArtworkFilterArtworkGrid2_filteredArtworks
        }

        # ...CollectionRefetch_collection
        #   @arguments(
        #     acquireable: $acquireable
        #     at_auction: $at_auction
        #     color: $color
        #     for_sale: $for_sale
        #     height: $height
        #     inquireable_only: $inquireable_only
        #     major_periods: $major_periods
        #     medium: $medium
        #     offerable: $offerable
        #     page: $page
        #     price_range: $price_range
        #     sort: $sort
        #     width: $width
        #   )
      }
    `,
  }
)
