import { ArtworkQueryFilter } from "Components/v2/ArtworkFilter"
import { RouteConfig } from "found"
// import React from "react"
import { graphql } from "react-relay"
// import AnalyticsProvider from "./AnalyticsProvider"
// import { CollectionAppFragmentContainer as CollectionApp } from "./CollectionApp"
// import { buildUrlForCollectApp, buildUrlForCollectionApp } from "./urlBuilder"

import { CollectApp } from "./Routes/Collect"
import { CollectionApp } from "./Routes/Collection"
import { CollectionsApp } from "./Routes/Collections"

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

export const routes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    prepareVariables: initializeVariablesWithFilterState,
    query: ArtworkQueryFilter,
  },
  {
    path: "/collections",
    Component: CollectionsApp,
    query: graphql`
      query routes_MarketingCollectionsApp2Query {
        categories: marketingCategories {
          ...Collections_categories @relay(mask: false)
        }
      }
    `,
  },
  {
    path: "/collection/:slug",
    Component: CollectionApp,
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query routes_MarketingCollectionApp2Query(
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
  },
]
