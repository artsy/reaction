import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import ArtworksContent from "./ArtworkFilterArtworkGrid"

interface Props {
  artist: ArtworkFilter_artist
  filters?: any // FIXME
  relay: RelayRefetchProp
}

class Filter extends Component<Props> {
  renderCurrentlySelected(filter, state) {
    let selectedFilter = null

    if (
      (filter === "institution" || filter === "gallery") &&
      state.partner_id
    ) {
      selectedFilter = state.partner_id
    }
    if (filter === "major_period" && state.major_periods) {
      selectedFilter = state.major_periods[0]
    } else {
      selectedFilter = state[filter]
    }

    return selectedFilter
  }

  renderFilters(filters) {
    return this.props.artist.filtered_artworks.aggregations.map(
      (aggregation, index) => {
        return (
          <div key={index}>
            <div>
              {aggregation.slice} -{" "}
              {this.renderCurrentlySelected(
                aggregation.slice.toLowerCase(),
                filters.state
              )}
              {this.renderSection(aggregation, filters)}
            </div>
            <br />
          </div>
        )
      }
    )
  }

  renderForSale(filters) {
    return (
      <div>
        <div>
          Currently selected: {filters.state.for_sale ? "Only for sale" : "All"}
        </div>
        <div
          onClick={() => {
            filters.setFilter("for_sale", true)
          }}
        >
          For sale
        </div>
        <div
          onClick={() => {
            filters.setFilter("for_sale", null)
          }}
        >
          All
        </div>
        <br />
      </div>
    )
  }

  renderSidebar(filters) {
    return (
      <div>
        {this.renderForSale(filters)}
        {this.renderFilters(filters)}
      </div>
    )
  }

  renderSection(aggregation, filters) {
    return aggregation.counts.slice(0, 10).map((count, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            filters.setFilter(aggregation.slice.toLowerCase(), count.id)
          }}
        >
          <span>{count.name}</span>
          <span>({count.count})</span>
        </div>
      )
    })
  }

  renderCategory(filters, category, counts) {
    return counts.slice(0, 10).map((count, index) => {
      return (
        <Radio
          selected={filters.state[category] === count.id}
          value={count.id}
          onSelect={selected => {
            if (selected) {
              return filters.setFilter(category, count.id)
            } else {
              return filters.unsetFilter(category)
            }
          }}
          key={index}
        >
          {count.name}
        </Radio>
      )
    })
  }

  componentDidUpdate(prevProps) {
    Object.keys(this.props.filters).forEach(key => {
      if (this.props.filters[key] !== prevProps.filters[key]) {
        this.fetch()
      }
    })
  }

  fetch = () => {
    this.props.relay.refetch(
      {
        artistID: this.props.artist.id,
        aggregations: [
          "MEDIUM",
          "TOTAL",
          "GALLERY",
          "INSTITUTION",
          "MAJOR_PERIOD",
        ],
        medium: this.props.filters.medium,
        for_sale: this.props.filters.for_sale,
        major_periods: this.props.filters.major_periods,
        partner_id: this.props.filters.partner_id,
        sort: this.props.filters.sort,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
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

    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return (
            <Responsive>
              {({ xs, sm, md }) => {
                return (
                  <React.Fragment>
                    <Flex>
                      {/* Sidebar Area */}
                      {!xs && (
                        <Sidebar width="30%" mr={2}>
                          <Toggle label="Purchase type" expanded disabled>
                            <Flex justifyContent="space-between">
                              <Checkbox
                                selected={filters.state.for_sale}
                                onSelect={value => {
                                  return filters.setFilter("for_sale", !value)
                                }}
                              >
                                For sale
                              </Checkbox>
                            </Flex>
                          </Toggle>
                          <Toggle label="Medium" expanded>
                            {this.renderCategory(
                              filters,
                              "medium",
                              mediumAggregation.counts
                            )}
                          </Toggle>
                          <Toggle label="Gallery">
                            {this.renderCategory(
                              filters,
                              "partner_id",
                              galleryAggregation.counts
                            )}
                          </Toggle>

                          <Toggle label="Institution">
                            {this.renderCategory(
                              filters,
                              "partner_id",
                              institutionAggregation.counts
                            )}
                          </Toggle>
                          <Toggle label="Time period">
                            {this.renderCategory(
                              filters,
                              "major_periods",
                              periodAggregation.counts
                            )}
                          </Toggle>
                        </Sidebar>
                      )}

                      {/* Artwork Grid */}

                      <Box width={xs ? "100%" : "70%"}>
                        {/* TODO: Implement sorting */}
                        <Flex justifyContent="flex-end">
                          <Select
                            options={[
                              {
                                value: "-partner_updated_at",
                                text: "Recently updated",
                              },
                              {
                                value: "-published_at",
                                text: "Recently added",
                              },
                            ]}
                            selected={filters.state.sort}
                            onSelect={filters.setSort}
                          />
                        </Flex>

                        <Spacer mb={2} />

                        <ArtworksContent
                          artistID={this.props.artist.id}
                          columnCount={xs || sm || md ? 2 : 3}
                          filtered_artworks={
                            this.props.artist.filtered_artworks as any
                          }
                        />
                      </Box>
                    </Flex>
                  </React.Fragment>
                )
              }}
            </Responsive>
          )
        }}
      </Subscribe>
    )
  }
}

export const ArtworkFilterRefetchContainer = createRefetchContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return <Filter {...props} filters={filters.state} />
        }}
      </Subscribe>
    )
  },
  {
    artist: graphql`
      fragment ArtworkFilter_artist on Artist
        @argumentDefinitions(
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
          }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
        ) {
        id
        filtered_artworks(
          aggregations: $aggregations
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          size: 0
          sort: $sort
        ) {
          aggregations {
            slice
            counts {
              name
              count
              id
            }
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtworkFilterRefetchQuery(
      $artistID: String!
      $medium: String
      $major_periods: [String]
      $partner_id: ID
      $for_sale: Boolean
      $sort: String
    ) {
      artist(id: $artistID) {
        ...ArtworkFilter_artist
          @arguments(
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            sort: $sort
          )
      }
    }
  `
)

const Sidebar = Box
