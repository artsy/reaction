import { CollectFilterContainer_viewer } from "__generated__/CollectFilterContainer_viewer.graphql"
import { ContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectRefetchContainer } from "./CollectRefetch"

import { FilterContainer } from "../Filters"

export interface CollectFilterContainerProps {
  viewer: CollectFilterContainer_viewer
}
export class CollectFilterContainer extends Component<
  CollectFilterContainerProps
> {
  render() {
    const { filter_artworks } = this.props.viewer
    const { aggregations } = filter_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")

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
                  >
                    {({ filters }) => (
                      <CollectRefetchContainer
                        viewer={this.props.viewer}
                        filters={filters}
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

export const CollectFilterFragmentContainer = createFragmentContainer(
  CollectFilterContainer,
  graphql`
    fragment CollectFilterContainer_viewer on Viewer
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
        artist_id: { type: "String" }
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
          artist_id: $artist_id
        )
    }
  `
)
