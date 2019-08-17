import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import AnalyticsProvider from "./Routes/Collect/AnalyticsProvider"

import { ArtworkQueryFilter } from "Components/v2/ArtworkFilter"
import {
  // buildUrlForCollectApp, // FIXME: wire into /collect
  buildUrlForCollectionApp,
} from "./Utils/urlBuilder"

import { CollectApp } from "./Routes/Collect"
import { CollectionAppFragmentContainer as CollectionApp } from "./Routes/Collection"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./Routes/Collections"

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    prepareVariables: initializeVariablesWithFilterState,
    query: ArtworkQueryFilter,
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
