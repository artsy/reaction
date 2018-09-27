// import { LargeSelect, SmallSelect } from "@artsy/palette"
import { ArtworkGrid_viewer } from "__generated__/ArtworkGrid_viewer.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { ContextConsumer } from "Artsy"
import { SystemProps } from "Artsy/SystemContext"
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

export const MediumRadios: React.SFC<{
  filters: FilterState
  mediums: ArtworkGrid_viewer["filter_artworks"]["aggregations"][0]["counts"]
  mediator: SystemProps["mediator"]
}> = ({ filters, mediums, mediator }) => (
  <>
    {mediums.map((medium, index) => {
      const isSelected = filters.state.medium === medium.id

      return (
        <Radio
          my={0.3}
          selected={isSelected}
          value={medium.id}
          onSelect={({ selected }) => {
            if (selected) {
              return filters.setFilter("medium", medium.id, mediator)
            } else {
              return filters.unsetFilter("medium", mediator)
            }
          }}
          key={index}
        >
          {medium.name}
        </Radio>
      )
    })}
  </>
)

export const TimePeriodRadios: React.SFC<{
  filters: FilterState
  mediator: SystemProps["mediator"]
}> = ({ filters, mediator }) => (
  <>
    {allowedPeriods.map((timePeriod, index) => {
      const isSelected = filters.state.major_periods[0] === timePeriod

      return (
        <Radio
          my={0.3}
          selected={isSelected}
          value={timePeriod}
          onSelect={({ selected }) => {
            if (selected) {
              return filters.setFilter("major_periods", timePeriod, mediator)
            } else {
              return filters.unsetFilter("major_periods", mediator)
            }
          }}
          key={index}
        >
          {timePeriod}
        </Radio>
      )
    })}
  </>
)

class Filter extends Component<Props> {
  static defaultProps = {
    hideTopBorder: false,
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
            filters.setFilter("price_range", `${min}-*`, mediator)
          } else {
            filters.setFilter("price_range", `${min}-${max}`, mediator)
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
                                  <MediumRadios
                                    filters={filters}
                                    mediums={mediumAggregation.counts}
                                    mediator={mediator}
                                  />
                                </Toggle>
                                <Toggle
                                  expanded={
                                    filters.state.major_periods.length > 0
                                  }
                                  label="Time period"
                                >
                                  <TimePeriodRadios
                                    filters={filters}
                                    mediator={mediator}
                                  />
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
                                    return filters.setFilter(
                                      "sort",
                                      sort,
                                      mediator
                                    )
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
          defaultValue: [MEDIUM, TOTAL]
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

const allowedPeriods = [
  "2010",
  "2000",
  "1990",
  "1980",
  "1970",
  "1960",
  "1950",
  "1940",
  "1930",
  "1920",
  "1910",
  "1900",
  "Late 19th Century",
  "Mid 19th Century",
  "Early 19th Century",
]
