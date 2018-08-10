import { Sans } from "@artsy/palette"
import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { ArtworkFilterRefetchContainer as ArtworkFilter } from "./ArtworkFilterRefetch"

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
        <Sans size="2" weight="medium" color="black100" mt={0.3}>
          Ways to Buy
        </Sans>
        <Checkbox
          selected={filters.state.ecommerce}
          onSelect={value => {
            return filters.setFilter("ecommerce", value, mediator)
          }}
        >
          Buy Now
        </Checkbox>
        <Checkbox
          selected={filters.state.at_auction}
          onSelect={value => {
            return filters.setFilter("at_auction", value, mediator)
          }}
        >
          Bid
        </Checkbox>
        <Checkbox
          selected={filters.state.for_sale}
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
    const { hideTopBorder } = this.props
    const { aggregations } = this.props.artist.filtered_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const galleryAggregation = aggregations.find(agg => agg.slice === "GALLERY")
    const institutionAggregation = aggregations.find(
      agg => agg.slice === "INSTITUTION"
    )
    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )
    const hasForSaleArtworks = this.props.artist.counts.for_sale_artworks > 0

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
                return (
                  <>
                    <Flex>
                      {/*
                        Sidebar Area
                      */}

                      {!xs && (
                        <Sidebar width="30%" mr={2}>
                          <Flex
                            flexDirection="column"
                            alignItems="left"
                            mt={-1}
                            mb={1}
                          >
                            {!hideTopBorder && <Separator mb={1} />}

                            {currentUser &&
                            currentUser.lab_features &&
                            currentUser.lab_features.includes(
                              "New Buy Now Flow"
                            )
                              ? this.renderWaysToBuy(filters, mediator)
                              : this.renderForSaleCheckbox(
                                  filters,
                                  hasForSaleArtworks,
                                  mediator
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
                        </Sidebar>
                      )}

                      {/*
                        Main Artwork Grid
                      */}

                      <Box width={xs ? "100%" : "70%"}>
                        {!hideTopBorder && <Separator mb={2} mt={-1} />}

                        <Flex justifyContent="flex-end">
                          <Select
                            mt="-8px"
                            options={
                              [
                                { value: "-decayed_merch", text: "Default" },
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
                                { value: "year", text: "Artwork year (asc.)" },
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
                          artist={this.props.artist as any}
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
