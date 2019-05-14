import { SearchResultsFilterContainer_viewer } from "__generated__/SearchResultsFilterContainer_viewer.graphql"
import { SystemContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SearchResultsRefetchContainer } from "./SearchResultsRefetch"

import { FilterState } from "Apps/Search/FilterState"
import { FilterContainer } from "./Filters"

export interface SearchFilterContainerProps {
  viewer: SearchResultsFilterContainer_viewer
  term: string
}
export class SearchResultsFilterContainer extends Component<
  SearchFilterContainerProps
> {
  render() {
    const { viewer, term } = this.props
    const { filter_artworks } = viewer
    const { aggregations } = filter_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")

    return (
      <SystemContextConsumer>
        {({ user }) => {
          return (
            <FilterContainer
              user={user}
              mediums={mediumAggregation.counts as any}
            >
              {(filters: FilterState) => (
                <SearchResultsRefetchContainer
                  viewer={this.props.viewer}
                  filtersState={filters.state}
                  term={term}
                />
              )}
            </FilterContainer>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const SearchResultsFilterFragmentContainer = createFragmentContainer(
  SearchResultsFilterContainer,
  {
    viewer: graphql`
      fragment SearchResultsFilterContainer_viewer on Viewer
        @argumentDefinitions(
          medium: { type: "String" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL]
          }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          artist_id: { type: "String" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          keyword: { type: "String!", defaultValue: "" }
          page: { type: "Int" }
        ) {
        filter_artworks(aggregations: $aggregations, size: 0) {
          aggregations {
            slice
            counts {
              name
              id
            }
          }
        }
        ...SearchResultsRefetch_viewer
          @arguments(
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            sort: $sort
            acquireable: $acquireable
            at_auction: $at_auction
            inquireable_only: $inquireable_only
            price_range: $price_range
            height: $height
            width: $width
            artist_id: $artist_id
            attribution_class: $attribution_class
            offerable: $offerable
            color: $color
            keyword: $keyword
            page: $page
          )
      }
    `,
  }
)
