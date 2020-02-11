import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

import { paramsToCamelCase } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { CollectionAppQuery } from "./Routes/Collection/CollectionAppQuery"

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    getComponent: () => loadable(() => import("./Routes/Collect")),
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
    getComponent: () => loadable(() => import("./Routes/Collections")),
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
    getComponent: () => loadable(() => import("./Routes/Collection")),
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
    ...paramsToCamelCase(initialFilterState),
    ...params,
  }

  return state
}
