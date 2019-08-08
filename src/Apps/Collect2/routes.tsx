import { ArtworkQueryFilter } from "Components/v2/ArtworkFilter"
import { RouteConfig } from "found"
// import React from "react"
import { graphql } from "react-relay"
// import AnalyticsProvider from "./AnalyticsProvider"
// import { CollectionAppFragmentContainer as CollectionApp } from "./CollectionApp"
// import { buildUrlForCollectApp, buildUrlForCollectionApp } from "./urlBuilder"

import { CollectApp } from "./Routes/Collect"
import { CollectionAppFragmentContainer as CollectionApp } from "./Routes/Collection"
import { CollectionsAppFragmentContainer as CollectionsApp } from "./Routes/Collections"

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
          ...Collections_categories
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
        $acquireable: Boolean
        $at_auction: Boolean
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
        $slug: String!
        $sort: String
        $width: String
      ) {
        viewer: marketingCollection(slug: $slug) {
          ...Collection_viewer
            @arguments(
              acquireable: $acquireable
              at_auction: $at_auction
              color: $color
              for_sale: $for_sale
              height: $height
              inquireable_only: $inquireable_only
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
]
