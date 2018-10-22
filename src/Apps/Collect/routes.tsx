import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import AnalyticsProvider from "./AnalyticsProvider"
import { CollectAppFragmentContainer as CollectApp } from "./CollectApp"
import { CollectionAppFragmentContainer as CollectionApp } from "./CollectionApp"

export const routes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    query: graphql`
      query routes_CollectAppQuery(
        $medium: String
        $major_periods: [String]
        $partner_id: ID
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $acquireable: Boolean
        $inquireable_only: Boolean
        $price_range: String
        $artist_id: String
        $attribution_class: [String]
      ) {
        viewer {
          ...CollectApp_viewer
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
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      return <AnalyticsProvider {...props} Component={Component} />
    },
    prepareVariables: (params, props) => {
      const initialFilterState = props.location ? props.location.query : {}
      if (params.medium) {
        initialFilterState.medium = params.medium
        if (props.location.query) {
          props.location.query.medium = params.medium
        }
      }
      if (!params.sort) {
        params.sort = "-decayed_merch"
      }
      return { ...initialFilterState, ...params }
    },
  },
  {
    path: "/collection/:slug",
    Component: CollectionApp,
    query: graphql`
      query routes_MarketingCollectionAppQuery($slug: String!) {
        collection: marketingCollection(slug: $slug) {
          ...CollectionApp_collection
        }
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      return <AnalyticsProvider {...props} Component={Component} />
    },
  },
]
