import { SearchResultsArticlesRouteRouteFragmentContainer as SearchResultsArticlesRoute } from "Apps/Search/Routes/Articles/SearchResultsArticles"
import { SearchResultsArtistsRouteFragmentContainer as SearchResultsArtistsRoute } from "Apps/Search/Routes/Artists/SearchResultsArtists"
import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworksRoute } from "Apps/Search/Routes/Artworks/SearchResultsArtworks"
import { SearchResultsAuctionsRouteRouteFragmentContainer as SearchResultsAuctionsRoute } from "Apps/Search/Routes/Auctions/SearchResultsAuctions"
import { SearchResultsCategoriesRouteRouteFragmentContainer as SearchResultsCategoriesRoute } from "Apps/Search/Routes/Categories/SearchResultsCategories"
import { SearchResultsCollectionsRouteFragmentContainer as SearchResultsCollectionsRoute } from "Apps/Search/Routes/Collections/SearchResultsCollections"
import { SearchResultsGalleriesRouteRouteFragmentContainer as SearchResultsGalleriesRoute } from "Apps/Search/Routes/Galleries/SearchResultsGalleries"
import { SearchResultsShowsRouteRouteFragmentContainer as SearchResultsShowsRoute } from "Apps/Search/Routes/Shows/SearchResultsShows"
import { RouteConfig } from "found"
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
          query routes_SearchResultsArtworksQuery($term: String!) {
            viewer {
              ...SearchResultsArtworks_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "artists",
        Component: SearchResultsArtistsRoute,
        query: graphql`
          query routes_SearchResultsArtistsQuery($term: String!) {
            viewer {
              ...SearchResultsArtistsRoute_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "collections",
        Component: SearchResultsCollectionsRoute,
        query: graphql`
          query routes_SearchResultsCollectionsQuery($term: String!) {
            viewer {
              ...SearchResultsCollections_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "shows",
        Component: SearchResultsShowsRoute,
        query: graphql`
          query routes_SearchResultsShowsQuery($term: String!) {
            viewer {
              ...SearchResultsShows_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "galleries",
        Component: SearchResultsGalleriesRoute,
        query: graphql`
          query routes_SearchResultsGalleriesQuery($term: String!) {
            viewer {
              ...SearchResultsGalleries_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "categories",
        Component: SearchResultsCategoriesRoute,
        query: graphql`
          query routes_SearchResultsCategoriesQuery($term: String!) {
            viewer {
              ...SearchResultsCategories_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "articles",
        Component: SearchResultsArticlesRoute,
        query: graphql`
          query routes_SearchResultsArticlesQuery($term: String!) {
            viewer {
              ...SearchResultsArticles_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "auctions",
        Component: SearchResultsAuctionsRoute,
        query: graphql`
          query routes_SearchResultsAuctionsQuery($term: String!) {
            viewer {
              ...SearchResultsAuctions_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
    ],
  },
]
