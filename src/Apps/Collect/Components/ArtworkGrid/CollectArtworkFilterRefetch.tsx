import { CollectArtworkFilterRefetch_viewer } from "__generated__/CollectArtworkFilterRefetch_viewer.graphql"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { CollectArtworkGridRefreshContainer as ArtworkFilter } from "./CollectArtworkGrid"
interface CollectArtworkFilterRefetchProps {
  filters: any
  viewer: CollectArtworkFilterRefetch_viewer
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
            // TODO: Figure out why this isn't typed properly.
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

export const CollectArtworkGridRefetchContainer = createRefetchContainer(
  CollectArtworkFilterRefetch,
  {
    viewer: graphql`
      fragment CollectArtworkFilterRefetch_viewer on Viewer
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
    query CollectArtworkFilterRefetchQuery(
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
        ...CollectArtworkFilterRefetch_viewer
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
