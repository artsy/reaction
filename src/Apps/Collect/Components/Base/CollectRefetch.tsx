import { CollectRefetch_viewer } from "__generated__/CollectRefetch_viewer.graphql"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectArtworkGridRefreshContainer as ArtworkFilter } from "./CollectArtworkGrid"
interface CollectRefetchProps {
  filters: any
  viewer: CollectRefetch_viewer
  relay: RelayRefetchProp
}

export class CollectRefetch extends Component<CollectRefetchProps> {
  // FIXME: Figure out a pattern so that setState can replace this completely
  // Used to prevent multiple in-flight requests
  private isLoading = false

  componentDidUpdate(prevProps) {
    Object.keys(this.props.filters).forEach(key => {
      if (
        key !== "page" &&
        !isEqual(this.props.filters[key], prevProps.filters[key])
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
    const { filtered_artworks } = this.props.viewer
    return (
      <Responsive>
        {({ xs, sm, md }) => (
          <ArtworkFilter
            filtered_artworks={filtered_artworks as any}
            isLoading={this.isLoading}
            columnCount={xs || sm || md ? 2 : 3}
            filters={filters.state}
          />
        )}
      </Responsive>
    )
  }
}

export const CollectRefetchContainer = createRefetchContainer(
  CollectRefetch,
  {
    viewer: graphql`
      fragment CollectRefetch_viewer on Viewer
        @argumentDefinitions(
          medium: { type: "String", defaultValue: "*" }
          major_periods: { type: "[String]" }
          partner_id: { type: "ID" }
          for_sale: { type: "Boolean" }
          at_auction: { type: "Boolean" }
          acquireable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
        ) {
        filtered_artworks: filter_artworks(
          aggregations: [TOTAL]
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          at_auction: $at_auction
          acquireable: $acquireable
          inquireable_only: $inquireable_only
          size: 0
          sort: $sort
          price_range: $price_range
        ) {
          ...CollectArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query CollectRefetchQuery(
      $medium: String
      $major_periods: [String]
      $partner_id: ID
      $acquireable: Boolean
      $at_auction: Boolean
      $inquireable_only: Boolean
      $for_sale: Boolean
      $sort: String
      $price_range: String
    ) {
      viewer {
        ...CollectRefetch_viewer
          @arguments(
            medium: $medium
            major_periods: $major_periods
            partner_id: $partner_id
            for_sale: $for_sale
            sort: $sort
            at_auction: $at_auction
            acquireable: $acquireable
            inquireable_only: $inquireable_only
            price_range: $price_range
          )
      }
    }
  `
)
