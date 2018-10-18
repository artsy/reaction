import { Box, Flex, Spacer } from "@artsy/palette"
import { Filter_viewer } from "__generated__/Filter_viewer.graphql"
import { CollectRefetchContainer } from "Apps/Collect/Components/Base/CollectRefetch"
import { PriceRangeFilter as PriceRange } from "Apps/Collect/Components/Filters/PriceRangeFilter"
import { FilterState } from "Apps/Collect/FilterState"
import { AttributionClassFilter } from "Apps/Comparables/Filter/AttributionClassFilter"
import { MediumFilter } from "Apps/Comparables/Filter/MediumFilter"
import { ContextProps } from "Artsy"
import { SystemProps } from "Artsy/SystemContext"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Subscribe } from "unstated"

interface Props extends ContextProps {
  filters: FilterState
  mediator: SystemProps["mediator"]
  viewer: Filter_viewer
}

class Comparables extends Component<Props> {
  renderPriceRange() {
    const { filters } = this.props

    return <PriceRange filters={filters} />
  }
  render() {
    const { filters } = this.props
    return (
      <div>
        <Flex>
          <Sidebar width="25%" mr={4}>
            {this.renderPriceRange()}
            <Spacer mb={4} />
            <Toggle label="Medium" expanded>
              <MediumFilter />
            </Toggle>
            <Spacer mb={4} />
            <Toggle label="Attribution Class" expanded>
              <AttributionClassFilter />
            </Toggle>
          </Sidebar>
          <Box width="75%" ml={4}>
            <CollectRefetchContainer
              filtersState={filters.state}
              viewer={this.props.viewer}
            />
          </Box>
        </Flex>
      </div>
    )
  }
}

export const ComparablesFragmentContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return <Comparables {...props} filters={filters} />
        }}
      </Subscribe>
    )
  },
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
          attribution_class: $attribution_class
        )
    }
  `
)

const Sidebar = Box
