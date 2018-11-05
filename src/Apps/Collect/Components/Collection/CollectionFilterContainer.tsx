import { ContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectionRefetchContainer } from "./CollectionRefetch"

import { CollectionFilterContainer_collection } from "__generated__/CollectionFilterContainer_collection.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { FilterContainer } from "../Filters"

export interface CollectionFilterContainerProps {
  collection?: CollectionFilterContainer_collection
}
export class CollectionFilterContainer extends Component<
  CollectionFilterContainerProps
> {
  render() {
    const { collection } = this.props
    const { aggregations } = collection.artworks
    const mediumAggregation = aggregations.find(
      agg => agg.slice === "MEDIUM"
    ) || { counts: [] }

    const timePeriodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    ) || { counts: [] }

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Responsive>
              {({ xs }) => {
                return (
                  <FilterContainer
                    isMobile={xs}
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
              }}
            </Responsive>
          )
        }}
      </ContextConsumer>
    )
  }
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
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
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
            at_auction: $at_auction
            inquireable_only: $inquireable_only
            price_range: $price_range
          )
      }
    `,
  }
)
