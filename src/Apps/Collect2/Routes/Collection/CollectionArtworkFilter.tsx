import { ArtworkFilter } from "Components/v2/ArtworkFilter"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export const CollectionArtworkFilter = props => {
  console.log(props)
  return <ArtworkFilter {...props} />
}

export const CollectionArtworkFilterFragmentContainer = createFragmentContainer(
  CollectionArtworkFilter,
  {
    collection: graphql`
      fragment CollectionArtworkFilter_collection on MarketingCollection
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

        filtered_artworks: artworks(
          aggregations: [TOTAL]
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          at_auction: $at_auction
          acquireable: $acquireable
          offerable: $offerable
          inquireable_only: $inquireable_only
          size: 0
          sort: $sort
          price_range: $price_range
          height: $height
          width: $width
          color: $color
          page: $page
        ) {
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }

        ...CollectionRefetch_collection
        #   @arguments(
        #     medium: $medium
        #     major_periods: $major_periods
        #     for_sale: $for_sale
        #     sort: $sort
        #     acquireable: $acquireable
        #     offerable: $offerable
        #     at_auction: $at_auction
        #     inquireable_only: $inquireable_only
        #     price_range: $price_range
        #     height: $height
        #     width: $width
        #     color: $color
        #     page: $page
        #   )
      }
    `,
  }
)
