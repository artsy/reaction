import { CollectRefetch_viewer } from "__generated__/CollectRefetch_viewer.graphql"
import {
  FilterState,
  untrackedFilters,
  urlFragmentFromState,
} from "Apps/Collect/FilterState"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import createLogger from "Utils/logger"
import { CollectArtworkGridRefreshContainer as CollectArtworkGrid } from "./CollectArtworkGrid"

const logger = createLogger("CollectRefetch.tsx")

interface CollectRefetchProps {
  filtersState: FilterState["state"]
  viewer: CollectRefetch_viewer
  relay: RelayRefetchProp
}

@track()
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
        this.loadFilter(key)
      }
    })
  }

  @track((props: CollectRefetchProps, _state, [key]) => {
    return {
      action_type: Schema.ActionType.CommercialFilterParamsChanged,
      changed: { [key]: props.filtersState[key] },
      current: { ...props.filtersState },
    }
  })
  trackFilter(_key: string) {
    // no-op
  }

  loadFilter = (key: string) => {
    if (!this.isLoading) {
      this.setState({
        isLoading: true,
      })

      this.isLoading = true

      if (untrackedFilters.includes(key)) this.trackFilter(key)
      this.props.relay.refetch(
        {
          ...this.props.filtersState,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
          }

          // Using window.history.pushState instead of router.push, because
          //  we just want to add to the history, not navigate to another route.
          window.history.pushState(
            {},
            null,
            `${window.location.pathname}?${urlFragmentFromState(
              this.props.filtersState
            )}`
          )

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
      <CollectArtworkGrid
        filtered_artworks={filtered_artworks as any}
        isLoading={this.isLoading}
        columnCount={[2, 2, 2, 3]}
        filters={filtersState}
      />
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
          offerable: { type: "Boolean" }
          inquireable_only: { type: "Boolean" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          price_range: { type: "String" }
          height: { type: "String" }
          width: { type: "String" }
          artist_id: { type: "String" }
          attribution_class: { type: "[String]" }
          color: { type: "String" }
          page: { type: "Int" }
          dimension_range: { type: "String" }
        ) {
        filtered_artworks: filter_artworks(
          aggregations: [TOTAL]
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          at_auction: $at_auction
          acquireable: $acquireable
          offerable: $offerable
          inquireable_only: $inquireable_only
          size: 0
          sort: $sort
          price_range: $price_range
          height: $height
          width: $width
          artist_id: $artist_id
          attribution_class: $attribution_class
          color: $color
          page: $page
          dimension_range: $dimension_range
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
      $offerable: Boolean
      $at_auction: Boolean
      $inquireable_only: Boolean
      $for_sale: Boolean
      $sort: String
      $price_range: String
      $height: String
      $width: String
      $artist_id: String
      $attribution_class: [String]
      $color: String
      $page: Int
      $dimension_range: String
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
            offerable: $offerable
            inquireable_only: $inquireable_only
            price_range: $price_range
            height: $height
            width: $width
            artist_id: $artist_id
            attribution_class: $attribution_class
            color: $color
            page: $page
            dimension_range: $dimension_range
          )
      }
    }
  `
)
