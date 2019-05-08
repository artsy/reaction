import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectionRefetchContainer } from "./CollectionRefetch"

import { CollectionFilterContainer_collection } from "__generated__/CollectionFilterContainer_collection.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { FilterContainer } from "../Filters"

export interface CollectionFilterContainerProps {
  collection?: CollectionFilterContainer_collection
}
export const CollectionFilterContainer: React.FC<
  CollectionFilterContainerProps
> = props => {
  const { user, mediator } = useContext(SystemContext)
  const { collection } = props
  const { aggregations } = collection.artworks
  const mediumAggregation = aggregations.find(
    agg => agg.slice === "MEDIUM"
  ) || { counts: [] }

  const timePeriodAggregation = aggregations.find(
    agg => agg.slice === "MAJOR_PERIOD"
  ) || { counts: [] }

  return (
    <FilterContainer
      user={user}
      mediator={mediator}
      mediums={mediumAggregation.counts as any}
      timePeriods={timePeriodAggregation.counts as any}
    >
      {(filters: FilterState) => (
        <CollectionRefetchContainer
          collection={collection}
          filtersState={filters.state}
        />
      )}
    </FilterContainer>
  )
}

export const CollectionFilterFragmentContainer = createFragmentContainer(
  CollectionFilterContainer,
  {
    collection: graphql`
      fragment CollectionFilterContainer_collection on MarketingCollection
        @argumentDefinitions(
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, MAJOR_PERIOD, TOTAL]
          }
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          color: { type: "String" }
          page: { type: "Int" }
        ) {
        artworks(
          aggregations: $aggregations
          include_medium_filter_in_aggregation: true
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

        ...CollectionRefetch_collection
          @arguments(
            medium: $medium
            major_periods: $major_periods
            for_sale: $for_sale
            sort: $sort
            acquireable: $acquireable
            offerable: $offerable
            at_auction: $at_auction
            inquireable_only: $inquireable_only
            price_range: $price_range
            height: $height
            width: $width
            color: $color
            page: $page
          )
      }
    `,
  }
)
