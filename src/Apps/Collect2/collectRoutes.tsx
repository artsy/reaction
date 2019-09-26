import { RouteConfig } from "found"
import { graphql } from "react-relay"

import { CollectAppFragmentContainer as CollectApp } from "./Routes/Collect"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./Routes/Collections"

import {
  CollectionAppQuery,
  CollectionRefetchContainer as CollectionApp,
} from "./Routes/Collection"

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    fetchIndicator: "overlay",
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query collectRoutes_ArtworkFilterQuery(
        $acquireable: Boolean
        $aggregations: [ArtworkAggregation] = [TOTAL]
        $artist_id: String
        $at_auction: Boolean
        $attribution_class: [String]
        $color: String
        $for_sale: Boolean
        $height: String
        $inquireable_only: Boolean
        $major_periods: [String]
        $medium: String
        $offerable: Boolean
        $page: Int
        $partner_id: ID
        $price_range: String
        $sort: String
        $keyword: String
        $width: String
      ) {
        marketingHubCollections {
          ...Collect_marketingHubCollections
        }

        filterArtworks: filter_artworks(
          aggregations: $aggregations
          sort: $sort
        ) {
          ...SeoProductsForArtworks_artworks
        }

        viewer {
          ...ArtworkFilter_viewer
            @arguments(
              acquireable: $acquireable
              aggregations: $aggregations
              artist_id: $artist_id
              at_auction: $at_auction
              attribution_class: $attribution_class
              color: $color
              for_sale: $for_sale
              height: $height
              inquireable_only: $inquireable_only
              keyword: $keyword
              major_periods: $major_periods
              medium: $medium
              offerable: $offerable
              page: $page
              partner_id: $partner_id
              price_range: $price_range
              sort: $sort
              width: $width
            )
        }
      }
    `,
  },
  {
    path: "/collections",
    Component: CollectionsApp,
    fetchIndicator: "overlay",
    query: graphql`
      query collectRoutes_MarketingCollectionsAppQuery {
        categories: marketingCategories @principalField {
          ...Collections_categories
        }
      }
    `,
  },
  {
    path: "/collection/:slug",
    Component: CollectionApp,
    prepareVariables: initializeVariablesWithFilterState,
    fetchIndicator: "overlay",
    query: CollectionAppQuery,
  },
]

function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = props.location ? props.location.query : {}

  if (params.medium) {
    initialFilterState.medium = params.medium

    if (props.location.query) {
      props.location.query.medium = params.medium
    }
  }

  const state = {
    sort: "-decayed_merch",
    ...initialFilterState,
    ...params,
  }

  return state
}
