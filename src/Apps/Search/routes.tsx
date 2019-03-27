import { RouteConfig } from "found"
import { graphql } from "react-relay"

import { SearchResultsArticlesRouteRouteFragmentContainer as SearchResultsArticlesRoute } from "Apps/Search/Routes/Articles/SearchResultsArticles"
import { SearchResultsArtistsRouteFragmentContainer as SearchResultsArtistsRoute } from "Apps/Search/Routes/Artists/SearchResultsArtists"
import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworksRoute } from "Apps/Search/Routes/Artworks/SearchResultsArtworks"
import { SearchResultsAuctionsRouteRouteFragmentContainer as SearchResultsAuctionsRoute } from "Apps/Search/Routes/Auctions/SearchResultsAuctions"
import { SearchResultsCategoriesRouteRouteFragmentContainer as SearchResultsCategoriesRoute } from "Apps/Search/Routes/Categories/SearchResultsCategories"
import { SearchResultsCollectionsRouteFragmentContainer as SearchResultsCollectionsRoute } from "Apps/Search/Routes/Collections/SearchResultsCollections"
import { SearchResultsGalleriesRouteRouteFragmentContainer as SearchResultsGalleriesRoute } from "Apps/Search/Routes/Galleries/SearchResultsGalleries"
import { SearchResultsMoreRouteRouteFragmentContainer as SearchResultsMoreRoute } from "Apps/Search/Routes/More/SearchResultsMore"
import { SearchResultsShowsRouteRouteFragmentContainer as SearchResultsShowsRoute } from "Apps/Search/Routes/Shows/SearchResultsShows"

import { SearchAppFragmentContainer as SearchApp } from "./SearchApp"

const prepareVariables = (_params, { location }) => {
  return location.query
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
      {
        path: "collections",
        Component: SearchResultsCollectionsRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsCollectionsQuery($term: String!) {
            viewer {
              ...SearchResultsCollections_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "shows",
        Component: SearchResultsShowsRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsShowsQuery($term: String!) {
            viewer {
              ...SearchResultsShows_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "galleries",
        Component: SearchResultsGalleriesRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsGalleriesQuery($term: String!) {
            viewer {
              ...SearchResultsGalleries_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "categories",
        Component: SearchResultsCategoriesRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsCategoriesQuery($term: String!) {
            viewer {
              ...SearchResultsCategories_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "articles",
        Component: SearchResultsArticlesRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsArticlesQuery($term: String!) {
            viewer {
              ...SearchResultsArticles_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "auctions",
        Component: SearchResultsAuctionsRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsAuctionsQuery($term: String!) {
            viewer {
              ...SearchResultsAuctions_viewer @arguments(term: $term)
            }
          }
        `,
      },
      {
        path: "more",
        Component: SearchResultsMoreRoute,
        prepareVariables,
        query: graphql`
          query routes_SearchResultsMoreQuery($term: String!) {
            viewer {
              ...SearchResultsMore_viewer @arguments(term: $term)
            }
          }
        `,
      },
    ],
  },
]
