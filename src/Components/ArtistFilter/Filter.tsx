import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Subscribe } from "unstated"

import ArtworksContent from "./Artworks"
import { FilterState } from "./state"

import { Filter_artist } from "../../__generated__/Filter_artist.graphql"

interface Props {
  artist: Filter_artist
}

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

  render() {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return (
            <div>
              <div style={{ float: "left" }}>{this.renderSidebar(filters)}</div>
              {this.renderArtworks()}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default createFragmentContainer(Filter, {
  artist: graphql`
    fragment Filter_artist on Artist
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
        ...Artworks_filtered_artworks
      }
    }
  `,
})
