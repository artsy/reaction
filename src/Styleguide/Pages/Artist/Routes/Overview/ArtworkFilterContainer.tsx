import { ArtworkFilterContainer_artist } from "__generated__/ArtworkFilterContainer_artist.graphql"

import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Select } from "Styleguide/Elements/Select"

import { Radio } from "Styleguide/Elements/Radio"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Subscribe } from "unstated"
import ArtworksContent from "./ArtworkFilterArtworks"
import { FilterState } from "./ArtworkFilterState"

interface Props {
  artist: ArtworkFilterContainer_artist
}

const ArtworkBrowser = styled(Flex)``
const ArtworkGridArea = styled(Flex)``
const Sidebar = Box

class Filter extends React.Component<Props> {
  renderCurrentlySelected(filter, state) {
    if (
      (filter === "institution" || filter === "gallery") &&
      state.partner_id
    ) {
      return state.partner_id
    }
    if (filter === "major_period" && state.major_periods) {
      return state.major_periods[0]
    }
    return state[filter]
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

  renderArtworks() {
    return (
      <ArtworksContent
        artistID={this.props.artist.id}
        filtered_artworks={this.props.artist.filtered_artworks as any}
      />
    )
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
                  <ArtworkBrowser>
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

                    <ArtworkGridArea
                      width={"100%"}
                      flexDirection="column"
                      alignItems="flex-end"
                    >
                      <Flex pb={2} justifyContent="flex-end">
                        {/* TODO: Implement sorting */}
                        <Select options={[{ value: "percy", text: "Cat" }]} />
                      </Flex>
                      {this.renderArtworks()}
                      <Spacer mb={3} />
                    </ArtworkGridArea>
                  </ArtworkBrowser>
                )
              }}
            </Responsive>
          )
        }}
      </Subscribe>
    )
  }
}

export const ArtworkFilterContainer = createFragmentContainer(Filter, {
  artist: graphql`
    fragment ArtworkFilterContainer_artist on Artist
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
        ...ArtworkFilterArtworks_filtered_artworks
      }
    }
  `,
})
