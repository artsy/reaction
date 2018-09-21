// import { LargeSelect, SmallSelect } from "@artsy/palette"
import { ArtworkGrid_viewer } from "__generated__/ArtworkGrid_viewer.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { ContextConsumer } from "Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { PriceRange } from "../Filters/PriceRange"
import { CollectArtworkGridRefetchContainer as ArtworkFilter } from "./CollectArtworkFilterRefetch"

import {
  Box,
  Checkbox,
  Flex,
  LargeSelect,
  Radio,
  Sans,
  Separator,
  SmallSelect,
  Spacer,
} from "@artsy/palette"

interface Props {
  hideTopBorder?: boolean
  viewer: ArtworkGrid_viewer
}

class Filter extends Component<Props> {
  static defaultProps = {
    hideTopBorder: false,
  }

  renderCategory(filters, category, counts, mediator) {
    const currentFilter =
      category === "major_periods"
        ? filters.state.major_periods[0]
        : filters.state[category]

    return counts.map((count, index) => {
      return (
        <Radio
          my={0.3}
          selected={currentFilter === count.id}
          value={count.id}
          onSelect={({ selected }) => {
            if (selected) {
              return filters.setFilter(category, count.id, mediator)
            } else {
              return filters.unsetFilter(category, mediator)
            }
          }}
          key={index}
        >
          {count.name}
        </Radio>
      )
    })
  }

  renderPriceRange(filters, mediator) {
    return (
      <PriceRange
        allowCross={false}
        min={50}
        max={50000}
        step={50}
        defaultValue={[50, 50000]}
        onAfterChange={([min, max]) => {
          if (max === 50000) {
            filters.setPriceRange(`${min}-*`, mediator)
          } else {
            filters.setPriceRange(`${min}-${max}`, mediator)
          }
        }}
      />
    )
  }

  renderForSaleCheckbox(filters, hasForSaleArtworks, mediator) {
    return (
      <Checkbox
        selected={filters.state.for_sale}
        disabled={!hasForSaleArtworks}
        onSelect={value => {
          return filters.setFilter("for_sale", value, mediator)
        }}
      >
        For sale
      </Checkbox>
    )
  }

  renderWaysToBuy(filters, mediator) {
    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" my={1}>
          Ways to Buy
        </Sans>
        <Checkbox
          selected={filters.state.at_auction}
          onSelect={value => filters.setFilter("at_auction", value, mediator)}
        >
          Bid
        </Checkbox>
        <Checkbox
          selected={filters.state.inquireable_only}
          onSelect={value =>
            filters.setFilter("inquireable_only", value, mediator)
          }
        >
          Inquire
        </Checkbox>
      </React.Fragment>
    )
  }

  render() {
    const { hideTopBorder } = this.props
    const { filter_artworks } = this.props.viewer
    const { aggregations } = filter_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )

    return (
      <ContextConsumer>
        {({ mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <Responsive>
                    {({ xs, sm, md }) => {
                      const Select = xs ? LargeSelect : SmallSelect

                      return (
                        <>
                          <Flex>
                            {/*
                            Sidebar Area
                          */}

                            {!xs && (
                              <Sidebar width="25%" mr={2}>
                                <Flex
                                  flexDirection="column"
                                  alignItems="left"
                                  mt={-1}
                                  mb={1}
                                >
                                  {!hideTopBorder && <Separator mb={1} />}

                                  {this.renderWaysToBuy(filters, mediator)}
                                </Flex>

                                <Flex
                                  flexDirection="column"
                                  alignItems="left"
                                  my={1}
                                >
                                  {this.renderPriceRange(filters, mediator)}
                                </Flex>

                                <Toggle label="Medium" expanded>
                                  {this.renderCategory(
                                    filters,
                                    "medium",
                                    mediumAggregation.counts,
                                    mediator
                                  )}
                                </Toggle>
                                <Toggle
                                  expanded={
                                    filters.state.major_periods.length > 0
                                  }
                                  label="Time period"
                                >
                                  {this.renderCategory(
                                    filters,
                                    "major_periods",
                                    periodAggregation.counts,
                                    mediator
                                  )}
                                </Toggle>
                              </Sidebar>
                            )}

                            {/*
                            Main Artwork Grid
                          */}

                            <span id="jump--collectArtworkGrid" />

                            <Box width={xs ? "100%" : "75%"}>
                              {!hideTopBorder && <Separator mb={2} mt={-1} />}

                              <Flex justifyContent="flex-end">
                                <Select
                                  mt="-8px"
                                  mr="15px"
                                  options={
                                    [
                                      {
                                        value: "-decayed_merch",
                                        text: "Default",
                                      },
                                      {
                                        value: "-partner_updated_at",
                                        text: "Recently updated",
                                      },
                                      {
                                        value: "-published_at",
                                        text: "Recently added",
                                      },
                                      {
                                        value: "-year",
                                        text: "Artwork year (desc.)",
                                      },
                                      {
                                        value: "year",
                                        text: "Artwork year (asc.)",
                                      },
                                    ] // Corrective spacing for line-height
                                  }
                                  selected={filters.state.sort}
                                  onSelect={sort => {
                                    return filters.setSort(sort, mediator)
                                  }}
                                />
                              </Flex>

                              <Spacer mb={2} />

                              <ArtworkFilter
                                viewer={this.props.viewer}
                                filters={filters.state}
                              />
                            </Box>
                          </Flex>
                        </>
                      )
                    }}
                  </Responsive>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkGridFragmentContainer = createFragmentContainer(
  Filter,
  graphql`
    fragment ArtworkGrid_viewer on Viewer
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
          defaultValue: [MAJOR_PERIOD, MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
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
        )
    }
  `
)

const Sidebar = Box
