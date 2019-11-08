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
        $artistID: String
        $atAuction: Boolean
        $attributionClass: [String]
        $color: String
        $forSale: Boolean
        $height: String
        $inquireableOnly: Boolean
        $majorPeriods: [String]
        $medium: String
        $offerable: Boolean
        $page: Int
        $partnerID: ID
        $priceRange: String
        $sort: String
        $keyword: String
        $width: String
      ) {
        marketingHubCollections {
          ...Collect_marketingHubCollections
        }
        filterArtworks: artworksConnection(
          aggregations: $aggregations
          sort: $sort
          first: 30
        ) {
          ...SeoProductsForArtworks_artworks
        }
        viewer {
          ...ArtworkFilter_viewer
            @arguments(
              acquireable: $acquireable
              aggregations: $aggregations
              artistID: $artistID
              atAuction: $atAuction
              attributionClass: $attributionClass
              color: $color
              forSale: $forSale
              height: $height
              inquireableOnly: $inquireableOnly
              keyword: $keyword
              majorPeriods: $majorPeriods
              medium: $medium
              offerable: $offerable
              page: $page
              partnerID: $partnerID
              priceRange: $priceRange
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
        marketingCategories @principalField {
          ...Collections_marketingCategories
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
