import { CollectRefetch_viewer } from "__generated__/CollectRefetch_viewer.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectArtworkGridRefreshContainer as CollectArtworkGrid } from "./CollectArtworkGrid"
interface CollectRefetchProps {
  filtersState: FilterState["state"]
  viewer: CollectRefetch_viewer
  relay: RelayRefetchProp
}

export class CollectRefetch extends Component<CollectRefetchProps> {
  // FIXME: Figure out a pattern so that setState can replace this completely
  // Used to prevent multiple in-flight requests
  private isLoading = false

  componentDidUpdate(prevProps: CollectRefetchProps) {
    Object.keys(this.props.filtersState).forEach(key => {
      if (
        key !== "page" &&
        !isEqual(this.props.filtersState[key], prevProps.filtersState[key])
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
          ...this.props.filtersState,
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
    const { filtersState } = this.props
    const { filtered_artworks } = this.props.viewer
    return (
      <Responsive>
        {({ xs, sm, md }) => (
          <CollectArtworkGrid
            filtered_artworks={filtered_artworks as any}
            isLoading={this.isLoading}
            columnCount={xs || sm || md ? 2 : 3}
            filters={filtersState}
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
          artist_id: { type: "String" }
          attribution_class: { type: "[String]" }
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
          artist_id: $artist_id
          attribution_class: $attribution_class
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
      $artist_id: String
      $attribution_class: [String]
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
            artist_id: $artist_id
            attribution_class: $attribution_class
          )
      }
    }
  `
)
