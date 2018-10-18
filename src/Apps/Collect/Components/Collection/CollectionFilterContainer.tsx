import { ContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectionRefetchContainer } from "./CollectionRefetch"

import { FilterState } from "Apps/Collect/FilterState"
import { FilterContainer } from "../Filters"

export interface CollectionFilterContainerProps {
  collection?: any
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
            defaultValue: [MEDIUM, TOTAL]
          }
        ) {
        artworks(aggregations: $aggregations, size: 0) {
          aggregations {
            slice
            counts {
              name
              id
            }
          }
        }

        ...CollectionRefetch_collection
      }
    `,
  }
)
