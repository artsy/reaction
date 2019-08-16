import { CollectFilterContainer_viewer } from "__generated__/CollectFilterContainer_viewer.graphql"
import { SystemContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectRefetchContainer } from "./CollectRefetch"

import { Box } from "@artsy/palette"
import { FilterState } from "Apps/Collect2/Routes/Collect/FilterState"
import { FilterContainer } from "../Filters"

export interface CollectFilterContainerProps {
  viewer: CollectFilterContainer_viewer
}
export class CollectFilterContainer extends Component<
  CollectFilterContainerProps
> {
  render() {
    return (
      <SystemContextConsumer>
        {({ user }) => {
          return (
            <>
              <Box id="jump--collectArtworkGrid" />
              <FilterContainer user={user}>
                {(filters: FilterState) => (
                  <CollectRefetchContainer
                    viewer={this.props.viewer}
                    filtersState={filters.state}
                  />
                )}
              </FilterContainer>
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const CollectFilterFragmentContainer = createFragmentContainer(
  CollectFilterContainer,
  {
    viewer: graphql`
      fragment CollectFilterContainer_viewer on Viewer
        @argumentDefinitions(
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]", defaultValue: [TOTAL] }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          artist_id: { type: "String" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          page: { type: "Int" }
          dimension_range: { type: "String" }
        ) {
        ...CollectRefetch_viewer
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
            page: $page
            dimension_range: $dimension_range
          )
      }
    `,
  }
)
