import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
}

class Filter extends Component<Props> {
  renderCategory(filters, category, counts) {
    const currentFilter =
      category === "major_periods"
        ? filters.state.major_periods[0]
        : filters.state[category]
    return counts.slice(0, 10).map((count, index) => {
      return (
        <Radio
          selected={currentFilter === count.id}
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
                                  return filters.setFilter("for_sale", value)
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

                      <Box width={xs ? "100%" : "70%"}>
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
                          filters={filters.state}
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

export const ArtworkFilterRefetchContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return <Filter {...props} filters={filters.state} />
        }}
      </Subscribe>
    )
  },
  graphql`
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
            id
          }
        }
        ...ArtworkFilterArtworkGrid_filtered_artworks
      }
    }
  `
)

const Sidebar = Box
