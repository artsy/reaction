import loadable from "@loadable/component"
import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import { RouteSpinner } from "Artsy/Relay/renderWithLoadProgress"
import { ArtworkQueryFilter } from "Components/v2/ArtworkFilter/ArtworkQueryFilter"
import { paramsToCamelCase } from "Components/v2/ArtworkFilter/Utils/urlBuilder"

const prepareVariables = (_params, { location }) => {
  return {
    ...paramsToCamelCase(location.query),
    keyword: location.query.term,
  }
}

const tabsToEntitiesMap = {
  collections: ["COLLECTION"],
  shows: ["SHOW"],
  fairs: ["FAIR"],
  institutions: ["INSTITUTION"],
  galleries: ["GALLERY"],
  categories: ["GENE"],
  articles: ["ARTICLE"],
  auctions: ["SALE"],
  more: ["TAG", "CITY", "FEATURE"],
}

const entityTabs = Object.entries(tabsToEntitiesMap).map(([key, entities]) => {
  return {
    path: key,
    getComponent: () =>
      loadable(() => import("./Routes/Entity/SearchResultsEntity")),

    // FIXME: We shouldn't overwrite our route functionality, as that breaks
    // global route configuration behavior.
    render: ({ props, Component }: { props?: any; Component?: any }) => {
      if (!props) {
        return <RouteSpinner />
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
    getComponent: () => loadable(() => import("./SearchApp")),
    query: graphql`
      query routes_SearchResultsTopLevelQuery($term: String!) {
        viewer {
          ...SearchApp_viewer @arguments(term: $term)
        }
      }
    `,
    prepareVariables,
    children: [
      {
        path: "/",
        getComponent: () => loadable(() => import("./Routes/Artworks")),
        prepareVariables,
        query: ArtworkQueryFilter,
      },
      {
        path: "artists",
        getComponent: () =>
          loadable(() => import("./Routes/Artists/SearchResultsArtists")),
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
