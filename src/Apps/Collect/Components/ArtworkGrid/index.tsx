import { ArtworkGrid_viewer } from "__generated__/ArtworkGrid_viewer.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { ContextConsumer } from "Artsy"
import { FilterIcon } from "Assets/Icons/FilterIcon"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Toggle } from "Styleguide/Components/Toggle"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { MediumFilter } from "../Filters/MediumFilter"
import { PriceRange } from "../Filters/PriceRange"
import { TimePeriodFilter } from "../Filters/TimePeriodFilter"
import { CollectArtworkGridRefetchContainer as ArtworkFilter } from "./CollectArtworkFilterRefetch"
import { MobileActionSheet } from "./MobileActionSheet"

import {
  Box,
  Button,
  Checkbox,
  color,
  Flex,
  Sans,
  Separator,
  SmallSelect,
  Spacer,
} from "@artsy/palette"

interface Props {
  hideTopBorder?: boolean
  viewer: ArtworkGrid_viewer
}

interface State {
  showMobileActionSheet: boolean
}

class Filter extends Component<Props, State> {
  static defaultProps = {
    hideTopBorder: false,
  }

  state = {
    showMobileActionSheet: false,
  }

  renderPriceRange(filters: FilterState, mediator) {
    const [initialMin, initialMax] = filters.priceRangeToTuple()

    return (
      <PriceRange
        allowCross={false}
        min={FilterState.MIN_PRICE}
        max={FilterState.MAX_PRICE}
        step={50}
        defaultValue={[initialMin, initialMax]}
        disabled={filters.state.at_auction}
        onAfterChange={([min, max]) => {
          const minStr = min === FilterState.MIN_PRICE ? "*" : min
          const maxStr = max === FilterState.MAX_PRICE ? "*" : max

          filters.setFilter("price_range", `${minStr}-${maxStr}`, mediator)
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

  renderWaysToBuy(filters, showBuyNow, mediator) {
    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" my={1}>
          Ways to Buy
        </Sans>
        {showBuyNow && (
          <Checkbox
            selected={filters.state.acquireable}
            onSelect={value => {
              return filters.setFilter("acquireable", value, mediator)
            }}
          >
            Buy now
          </Checkbox>
        )}
        <Checkbox
          selected={filters.state.at_auction}
          onSelect={value => filters.setFilter("at_auction", value, mediator)}
          disabled={filters.isPriceSelected()}
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

  renderSelect({ filters, mediator, xs }) {
    return (
      <Flex
        justifyContent={xs ? "space-between" : "flex-end"}
        alignItems="center"
      >
        <SmallSelect
          mt="-8px"
          options={[
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
          ]}
          selected={filters.state.sort}
          onSelect={sort => {
            return filters.setFilter("sort", sort, mediator)
          }}
        />

        {xs && (
          <Button
            size="small"
            mt={-1}
            onClick={() => this.setState({ showMobileActionSheet: true })}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <FilterIcon fill={color("white100")} />
              <Spacer mr={0.5} />
              Filter
            </Flex>
          </Button>
        )}
      </Flex>
    )
  }

  renderFilters({ user, filters, mediator, hideTopBorder }) {
    const hasLabFeature =
      user &&
      user.lab_features &&
      user.lab_features.includes("New Buy Now Flow")
    const enableBuyNowFlow = sd.ENABLE_NEW_BUY_NOW_FLOW || hasLabFeature

    const { filter_artworks } = this.props.viewer
    const { aggregations } = filter_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")

    return (
      <>
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          {!hideTopBorder && <Separator mb={1} />}

          {this.renderWaysToBuy(filters, enableBuyNowFlow, mediator)}
        </Flex>

        <Flex flexDirection="column" alignItems="left" my={1}>
          {this.renderPriceRange(filters, mediator)}
        </Flex>
        <Toggle label="Medium" expanded>
          <MediumFilter
            filters={filters}
            mediums={mediumAggregation.counts}
            mediator={mediator}
          />
        </Toggle>
        <Toggle expanded label="Time period">
          <TimePeriodFilter filters={filters} mediator={mediator} />
        </Toggle>
      </>
    )
  }

  render() {
    const { hideTopBorder } = this.props

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <Responsive>
                    {({ xs, sm, md }) => {
                      const Filters = () =>
                        this.renderFilters({
                          user,
                          filters,
                          mediator,
                          hideTopBorder,
                        })

                      return (
                        <>
                          <Flex>
                            {/*
                            Sidebar Area
                          */}

                            {xs ? (
                              // Mobile
                              this.state.showMobileActionSheet && (
                                <MobileActionSheet
                                  onClose={() =>
                                    this.setState({
                                      showMobileActionSheet: false,
                                    })
                                  }
                                >
                                  <Filters />
                                </MobileActionSheet>
                              )
                            ) : (
                              // Desktop
                              <Sidebar width="25%" mr={2}>
                                <Filters />
                              </Sidebar>
                            )}

                            {/*
                            Main Artwork Grid
                          */}

                            <span id="jump--collectArtworkGrid" />

                            <Box width={xs ? "100%" : "75%"}>
                              {!hideTopBorder && <Separator mb={2} mt={-1} />}

                              {this.renderSelect({
                                filters,
                                mediator,
                                xs,
                              })}

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
