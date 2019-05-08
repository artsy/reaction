import { CollectionRefetch_collection } from "__generated__/CollectionRefetch_collection.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { urlFragmentFromState } from "Apps/Search/FilterState"
import { isEqual } from "lodash"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import createLogger from "Utils/logger"
import { CollectArtworkGridRefreshContainer as ArtworkFilter } from "../Base/CollectArtworkGrid"

const logger = createLogger("CollectionRefetch.tsx")

interface CollectionRefetchProps {
  filtersState: FilterState["state"]
  collection: CollectionRefetch_collection
  relay?: RelayRefetchProp
}

export class CollectionRefetch extends Component<CollectionRefetchProps> {
  // FIXME: Figure out a pattern so that setState can replace this completely
  // Used to prevent multiple in-flight requests
  private isLoading = false

  componentDidUpdate(prevProps: CollectionRefetchProps) {
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
          collectionSlug: this.props.collection.slug,
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
    const { filtered_artworks } = this.props.collection
    return (
      <ArtworkFilter
        filtered_artworks={filtered_artworks as any}
        isLoading={this.isLoading}
        columnCount={[2, 2, 2, 3]}
        filters={filtersState}
      />
    )
  }
}

export const CollectionRefetchContainer = createRefetchContainer(
  CollectionRefetch,
  {
    collection: graphql`
      fragment CollectionRefetch_collection on MarketingCollection
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
          color: { type: "String" }
          page: { type: "Int" }
        ) {
        slug
        filtered_artworks: artworks(
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
          color: $color
          page: $page
        ) {
          ...CollectArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query CollectionRefetchQuery(
      $collectionSlug: String!
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
      $color: String
      $page: Int
    ) {
      marketingCollection(slug: $collectionSlug) {
        ...CollectionRefetch_collection
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
            color: $color
            page: $page
          )
      }
    }
  `
)
