import { Box, Flex, Spacer } from "@artsy/palette"
import { CollectArtworkGridRefetchContainer as ArtworkFilter } from "Apps/Collect/Components/ArtworkGrid/CollectArtworkFilterRefetch"
import { PriceRange } from "Apps/Collect/Components/Filters/PriceRange"
import { FilterState } from "Apps/Collect/FilterState"
import { AttributionClassFilter } from "Apps/Comparables/Filter/AttributionClassFilter"
import { MediumFilter } from "Apps/Comparables/Filter/MediumFilter"
import { ContextConsumer, ContextProps } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Subscribe } from "unstated"

export class Comparables extends Component<ContextProps> {
  renderPriceRange(filters: FilterState, mediator) {
    const [initialMin, initialMax] = filters.priceRangeToTuple()

    return (
      <PriceRange
        allowCross={false}
        min={FilterState.MIN_PRICE}
        max={FilterState.MAX_PRICE}
        step={50}
        defaultValue={[initialMin, initialMax]}
        onAfterChange={([min, max]) => {
          const minStr = min === FilterState.MIN_PRICE ? "*" : min
          const maxStr = max === FilterState.MAX_PRICE ? "*" : max

          filters.setFilter("price_range", `${minStr}-${maxStr}`, mediator)
        }}
      />
    )
  }
  render() {
    return (
      <ContextConsumer>
        {({ mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <div>
                    <Flex>
                      <Sidebar width="25%" mr={4}>
                        {this.renderPriceRange(filters, mediator)}
                        <Spacer mb={4} />
                        <Toggle label="Medium" expanded>
                          <MediumFilter filters={filters} mediator={mediator} />
                        </Toggle>
                        <Spacer mb={4} />
                        <Toggle label="Attribution Class" expanded>
                          <AttributionClassFilter
                            filters={filters}
                            mediator={mediator}
                          />
                        </Toggle>
                      </Sidebar>
                      <Box width="75%" ml={4}>
                        <ArtworkFilter
                          viewer={this.props.viewer}
                          filters={filters.state}
                        />
                      </Box>
                    </Flex>
                  </div>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ComparablesFragmentContainer = createFragmentContainer(
  Comparables,
  graphql`
    fragment Filter_viewer on Viewer
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: { type: "[ArtworkAggregation]", defaultValue: [TOTAL] }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
        artist_id: { type: "String" }
        attribution_class: { type: "[String]" }
      ) {
      ...CollectArtworkFilterRefetch_viewer
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
          attribution_class: $attribution_class
        )
    }
  `
)

const Sidebar = Box
