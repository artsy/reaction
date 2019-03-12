import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworksRoute } from "Apps/Search/Routes/Artworks/SearchResultsArtworks"
import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import { SearchAppFragmentContainer as SearchApp } from "./SearchApp"

// FIXME: The initial render includes `location` in props, but subsequent
// renders (such as tabbing back to this route in your browser) will not.
const prepareVariables = (params, props) => {
  const paramsFromUrl = props.location ? props.location.query : {}
  if (
    Object.keys(paramsFromUrl).length === 0 &&
    Object.keys(params).length === 0
  ) {
    return { term: "andy" }
  }
  return {
    ...paramsFromUrl,
    ...params,
  }
}

export const routes: RouteConfig[] = [
  {
    path: "/search2",
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
        query: graphql`
          query routes_SearchResultsArtworkQuery($term: String!) {
            viewer {
              ...SearchResultsArtworksRoute_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "artists",
        Component: () => <div>Artist search results</div>,
        prepareVariables,
      },
    ],
  },
]
