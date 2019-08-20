import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import AnalyticsProvider from "./Routes/Collect/AnalyticsProvider"
import { buildUrlForCollectionApp } from "./Utils/urlBuilder"

import { CollectAppFragmentContainer } from "./Routes/Collect"
import { CollectionAppFragmentContainer as CollectionApp } from "./Routes/Collection"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./Routes/Collections"

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectAppFragmentContainer,
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query collectRoutes_ArtworkFilterQuery(
        $acquireable: Boolean
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
        marketingCollections(size: 6) {
          ...Collect_marketingCollections
        }

        filter_artworks(aggregations: [TOTAL], sort: $sort) {
          ...SeoProductsForArtworks_artworks
        }

        viewer {
          ...ArtworkFilter_viewer
            @arguments(
              acquireable: $acquireable
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
    fetchIndicator: "overlay",
  },
  {
    path: "/collections",
    Component: CollectionsApp,
    query: graphql`
      query collectRoutes_MarketingCollectionsAppQuery {
        categories: marketingCategories {
          ...Collections_categories
        }
      }
    `,
    fetchIndicator: "overlay",
  },
  {
    path: "/collection/:slug",
    Component: props => {
      return (
        <AnalyticsProvider
          {...props}
          Component={CollectionApp}
          urlBuilder={buildUrlForCollectionApp}
        />
      )
    },
    query: graphql`
      query collectRoutes_MarketingCollectionApp2Query(
        $slug: String!
        $medium: String
        $major_periods: [String]
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $acquireable: Boolean
        $offerable: Boolean
        $inquireable_only: Boolean
        $price_range: String
        $height: String
        $width: String
        $color: String
        $page: Int
      ) {
        collection: marketingCollection(slug: $slug) {
          ...Collection_collection
            @arguments(
              medium: $medium
              major_periods: $major_periods
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
    `,
    prepareVariables: initializeVariablesWithFilterState,
    fetchIndicator: "overlay",
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
