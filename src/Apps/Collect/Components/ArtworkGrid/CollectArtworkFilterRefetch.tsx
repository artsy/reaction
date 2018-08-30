import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectArtworkGridRefreshContainer as ArtworkFilter } from "./CollectArtworkGrid"

interface CollectArtworkFilterRefetchProps {
  filters: any
  query: any
  relay: RelayRefetchProp
}

export class CollectArtworkFilterRefetch extends Component<
  CollectArtworkFilterRefetchProps
> {
  // FIXME: Figure out a pattern so that setState can replace this completely
  // Used to prevent multiple in-flight requests
  private isLoading = false

  componentDidUpdate(prevProps) {
    Object.keys(this.props.filters).forEach(key => {
      if (
        key !== "page" &&
        this.props.filters[key] !== prevProps.filters[key]
      ) {
        this.loadFilter()
      }
    })
  }

  loadFilter = () => {
    if (!this.isLoading) {
      this.setState({
        isLoading: true,
      })

      this.isLoading = true

      this.props.relay.refetch(
        {
          ...this.props.filters,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }

          this.setState({
            isLoading: false,
          })

          this.isLoading = false
        }
      )
    }
  }

  render() {
    const { filters } = this.props
    const { grid } = this.props.query
    return (
      <Responsive>
        {({ xs, sm, md }) => (
          <ArtworkFilter
            filtered_artworks={grid}
            columnCount={xs || sm || md ? 2 : 3}
            filters={filters.state}
          />
        )}
      </Responsive>
    )
  }
}

export const CollectArtworkGridRefreshContainer = createRefetchContainer(
  CollectArtworkFilterRefetch,
  graphql`
    fragment CollectArtworkFilterRefetch_query on Query
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
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

      grid: filter_artworks(
        aggregations: [TOTAL, FOLLOWED_ARTISTS]
        medium: $medium
        major_periods: $major_periods
        partner_id: $partner_id
        for_sale: $for_sale
        at_auction: $at_auction
        size: 40
        sort: $sort
      ) {
        ...CollectArtworkGrid_filtered_artworks
      }
    }
  `,
  // TODO: fix refetch query
  graphql`
    query CollectArtworkFilterRefetchQuery(
      $medium: String
      $major_periods: [String]
      $partner_id: ID
      $at_auction: Boolean
      $for_sale: Boolean
      $sort: String
    ) {
      ...CollectArtworkFilterRefetch_query
    }
  `
)
