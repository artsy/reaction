import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import AnalyticsProvider from "./Routes/Collect/AnalyticsProvider"

import { CollectAppFragmentContainer as CollectApp } from "./Routes/Collect"
import { CollectionAppFragmentContainer as CollectionApp } from "./Routes/Collection"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./Routes/Collections"

import {
  buildUrlForCollectApp,
  buildUrlForCollectionApp,
} from "./Utils/urlBuilder"

const initializeVariablesWithFilterState = (params, props) => {
  const initialFilterState = props.location ? props.location.query : {}
  if (params.medium) {
    initialFilterState.medium = params.medium
    if (props.location.query) {
      props.location.query.medium = params.medium
    }
  }

  return { sort: "-decayed_merch", ...initialFilterState, ...params }
}

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: props => {
      return (
        <AnalyticsProvider
          {...props}
          Component={CollectApp}
          urlBuilder={buildUrlForCollectApp}
        />
      )
    },
    query: graphql`
      query collectRoutes_CollectAppQuery(
        $medium: String
        $major_periods: [String]
        $partner_id: ID
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $acquireable: Boolean
        $offerable: Boolean
        $inquireable_only: Boolean
        $price_range: String
        $height: String
        $width: String
        $dimension_range: String
        $artist_id: String
        $attribution_class: [String]
        $color: String
        $page: Int
      ) {
        viewer {
          ...Collect_viewer
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
              dimension_range: $dimension_range
              artist_id: $artist_id
              attribution_class: $attribution_class
              color: $color
              page: $page
            )
        }
        marketingCollections(size: 6) {
          ...Collect_marketingCollections
        }
      }
    `,
    prepareVariables: initializeVariablesWithFilterState,
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
