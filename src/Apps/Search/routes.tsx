import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import { SearchResultsArtistsRouteFragmentContainer as SearchResultsArtistsRoute } from "Apps/Search/Routes/Artists/SearchResultsArtists"
import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworksRoute } from "Apps/Search/Routes/Artworks/SearchResultsArtworks"
import { SearchResultsEntityRouteFragmentContainer as SearchResultsEntityRoute } from "Apps/Search/Routes/Entity/SearchResultsEntity"

import { SearchAppFragmentContainer as SearchApp } from "./SearchApp"

const prepareVariables = (_params, { location }) => {
  return location.query
}

const tabsToEntitiesMap = {
  collections: ["COLLECTION"],
  shows: ["SHOW"],
  galleries: ["GALLERY"],
  categories: ["GENE"],
  articles: ["ARTICLE"],
  auctions: ["SALE"],
  more: ["TAG", "CITY", "FAIR", "FEATURE", "INSTITUTION"],
}

const entityTabs = Object.entries(tabsToEntitiesMap).map(([key, entities]) => {
  return {
    path: key,
    Component: SearchResultsEntityRoute,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }
      return <Component {...props} tab={key} entities={entities} />
    },
    prepareVariables: (_params, { location }) => {
      return {
        ...prepareVariables(_params, { location }),
        entities,
      }
    },
    query: graphql`
      query routes_SearchResultsEntityQuery(
        $term: String!
        $entities: [SearchEntity]
        $page: Int
      ) {
        viewer {
          ...SearchResultsEntity_viewer
            @arguments(term: $term, entities: $entities, page: $page)
        }
      }
    `,
  }
})

export const routes: RouteConfig[] = [
  {
    path: "/search",
    Component: SearchApp,
    query: graphql`
      query routes_SearchBarTopLevelQuery($term: String!) {
        viewer {
          ...SearchApp_viewer @arguments(term: $term)
        }
      }
    `,
    prepareVariables,
    children: [
      {
        path: "/",
        Component: SearchResultsArtworksRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsArtworksQuery(
            $term: String!
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
            $artist_id: String
            $attribution_class: [String]
            $color: String
            $page: Int
          ) {
            viewer {
              ...SearchResultsArtworks_viewer
                @arguments(
                  keyword: $term
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
                  artist_id: $artist_id
                  attribution_class: $attribution_class
                  color: $color
                  page: $page
                )
            }
          }
        `,
      },
      {
        path: "artists",
        Component: SearchResultsArtistsRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsArtistsQuery($term: String!, $page: Int) {
            viewer {
              ...SearchResultsArtists_viewer
                @arguments(term: $term, page: $page)
            }
          }
        `,
      },
      ...entityTabs,
    ],
  },
]
