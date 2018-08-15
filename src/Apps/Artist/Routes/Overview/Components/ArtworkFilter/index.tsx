import { Sans } from "@artsy/palette"
import { color } from "@artsy/palette"
import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { FilterIcon } from "Assets/Icons/FilterIcon"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { SmallSelect } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { ArtworkFilterRefetchContainer as ArtworkFilter } from "./ArtworkFilterRefetch"
import { MobileActionSheet } from "./MobileActionSheet"

interface Props {
  artist: ArtworkFilter_artist
  hideTopBorder?: boolean
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

  renderForSaleCheckbox(filters, mediator, counts) {
    const hasForSaleArtworks = counts.for_sale_artworks > 0

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

  renderWaysToBuy(filters, mediator, counts) {
    const hasForSaleArtworks = counts.for_sale_artworks > 0
    const hasBuyNowArtworks = counts.ecommerce_artworks > 0
    const hasAuctionArtworks = counts.auction_artworks > 0

    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" mt={0.3}>
          Ways to Buy
        </Sans>
        <Checkbox
          selected={filters.state.ecommerce}
          disabled={!hasBuyNowArtworks}
          onSelect={value => {
            return filters.setFilter("ecommerce", value, mediator)
          }}
        >
          Buy Now
        </Checkbox>
        <Checkbox
          selected={filters.state.at_auction}
          disabled={!hasAuctionArtworks}
          onSelect={value => {
            return filters.setFilter("at_auction", value, mediator)
          }}
        >
          Bid
        </Checkbox>
        <Checkbox
          selected={filters.state.for_sale}
          disabled={!hasForSaleArtworks}
          onSelect={value => {
            return filters.setFilter("for_sale", value, mediator)
          }}
        >
          Inquire
        </Checkbox>
      </React.Fragment>
    )
  }

  render() {
    const { aggregations } = this.props.artist.filtered_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const galleryAggregation = aggregations.find(agg => agg.slice === "GALLERY")
    const institutionAggregation = aggregations.find(
      agg => agg.slice === "INSTITUTION"
    )
    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )

    const { counts } = this.props.artist

    return (
      <Subscribe to={[AppState, FilterState]}>
        {(
          {
            state: {
              mediator,
              system: { currentUser },
            },
          },
          filters: FilterState
        ) => {
          return (
            <Responsive>
              {({ xs, sm, md }) => {
                const hideTopBorder = this.props.hideTopBorder || xs

                // Filters component to be rendered in Sidebar (desktop) and
                // ActionSheet (mobile)
                const Filters = () => {
                  return (
                    <>
                      <Flex
                        flexDirection="column"
                        alignItems="left"
                        mt={-1}
                        mb={1}
                      >
                        {!hideTopBorder && <Separator mb={1} />}

                        {currentUser &&
                        currentUser.lab_features &&
                        currentUser.lab_features.includes("New Buy Now Flow")
                          ? this.renderWaysToBuy(filters, mediator, counts)
                          : this.renderForSaleCheckbox(
                              filters,
                              mediator,
                              counts
                            )}
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
                        expanded={filters.state.partner_id}
                        label="Gallery"
                      >
                        {this.renderCategory(
                          filters,
                          "partner_id",
                          galleryAggregation.counts,
                          mediator
                        )}
                      </Toggle>

                      <Toggle
                        expanded={filters.state.partner_id}
                        label="Institution"
                      >
                        {this.renderCategory(
                          filters,
                          "partner_id",
                          institutionAggregation.counts,
                          mediator
                        )}
                      </Toggle>
                      <Toggle
                        expanded={filters.state.major_periods.length > 0}
                        label="Time period"
                      >
                        {this.renderCategory(
                          filters,
                          "major_periods",
                          periodAggregation.counts,
                          mediator
                        )}
                      </Toggle>
                    </>
                  )
                }
                return (
                  <>
                    <Flex>
                      {/*
                        Filter options
                      */}

                      {xs ? (
                        // Mobile
                        filters.state.showActionSheet && (
                          <MobileActionSheet
                            onClose={() => filters.showActionSheet(false)}
                          >
                            <Filters />
                          </MobileActionSheet>
                        )
                      ) : (
                        // Desktop
                        <Sidebar width="30%" mr={2}>
                          <Filters />
                        </Sidebar>
                      )}

                      {/*
                        Main Artwork Grid
                      */}

                      <Box width={xs ? "100%" : "70%"}>
                        {!hideTopBorder && <Separator mb={2} mt={-1} />}
                        <Flex
                          justifyContent={xs ? "space-between" : "flex-end"}
                          alignItems="center"
                        >
                          <SmallSelect
                            mt="-8px"
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

                          {xs && (
                            <Button
                              size="small"
                              mt={-1}
                              onClick={() => filters.showActionSheet(true)}
                            >
                              <Flex
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <FilterIcon fill={color("white100")} />
                                <Spacer mr={0.5} />
                                Filter
                              </Flex>
                            </Button>
                          )}
                        </Flex>

                        <Spacer mb={2} />

                        <ArtworkFilter
                          artist={this.props.artist}
                          artistID={this.props.artist.id}
                          columnCount={xs || sm || md ? 2 : 3}
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
  }
}

export const ArtworkFilterFragmentContainer = createFragmentContainer(
  Filter,
  graphql`
    fragment ArtworkFilter_artist on Artist
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        ecommerce: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
      ) {
      id
      counts {
        for_sale_artworks
        ecommerce_artworks
        auction_artworks
      }
      filtered_artworks(aggregations: $aggregations, size: 0) {
        aggregations {
          slice
          counts {
            name
            id
          }
        }
      }
      ...ArtworkFilterRefetch_artist
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          ecommerce: $ecommerce
          at_auction: $at_auction
        )
    }
  `
)

const Sidebar = Box
