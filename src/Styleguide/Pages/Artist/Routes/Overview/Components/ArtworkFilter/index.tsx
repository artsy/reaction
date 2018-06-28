import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Spacer } from "Styleguide/Elements/Spacer"
import { FilterState } from "Styleguide/Pages/Artist/Routes/Overview/state"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Subscribe } from "unstated"
import ArtworksContent from "./ArtworkFilterArtworkGrid"

interface Props {
  artist: ArtworkFilter_artist
  filters: any // FIXME
}

class Filter extends React.Component<Props> {
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
    return this.props.artist.filtered_artworks.aggregations.map(aggregation => {
      return (
        <div>
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
    })
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
    return aggregation.counts.slice(0, 10).map(count => {
      return (
        <div
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
    return counts.slice(0, 10).map(count => {
      return (
        <Radio
          selected={filters.state[category] === count.id}
          value={count.id}
          onSelect={v => {
            return (filters as any).setFilter(category, v)
          }}
        >
          {count.name}
        </Radio>
      )
    })
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
        {filters => {
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
                                  return (filters as any).setFilter(
                                    "for_sale",
                                    !value
                                  )
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
                              "major_period",
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
                                value: "RECENTLY_UPDATED",
                                text: "Recently updated",
                              },
                              {
                                value: "RECENTLY_ADDED",
                                text: "Recently added",
                              },
                            ]}
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

export const ArtworkFilterFragmentContainer = createFragmentContainer(Filter, {
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
      ) {
      id
      filtered_artworks(
        aggregations: $aggregations
        medium: $medium
        major_periods: $major_periods
        partner_id: $partner_id
        for_sale: $for_sale
        size: 0
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
})

const Sidebar = Box
