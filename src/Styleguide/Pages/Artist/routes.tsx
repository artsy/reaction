import React from "react"
import { graphql } from "react-relay"
import { ArtistApp } from "./ArtistApp"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRouteFragmentContainer as RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRouteFragmentContainer as ShowsRoute } from "./Routes/Shows"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"
// @ts-ignore
import { Props as ArticleProps } from "./Routes/Articles"
// @ts-ignore
import { AuctionResultProps } from "./Routes/AuctionResults"
// @ts-ignore
import { CVRouteProps } from "./Routes/CV"
// @ts-ignore
import { RelatedArtistsProps } from "./Routes/RelatedArtists"
// @ts-ignore
import { Props as ShowProps } from "./Routes/Shows"

export const routes = [
  {
    path: ":artistID",
    Component: ArtistApp,
    query: graphql`
      query routes_OverviewQueryRendererQuery($artistID: String!) {
        artist(id: $artistID) {
          ...ArtistHeader_artist
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: Overview,
      },
      {
        path: "cv",
        Component: CVRoute,
        query: graphql`
          query routes_CVQuery($artistID: String!) {
            viewer {
              ...CV_viewer
            }
          }
        `,
      },
      {
        path: "articles",
        Component: ArticlesRoute,
        query: graphql`
          query routes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Articles_artist
            }
          }
        `,
      },
      {
        path: "shows",
        Component: ShowsRoute,
        query: graphql`
          query routes_ShowsQuery($artistID: String!) {
            viewer {
              ...Shows_viewer
            }
          }
        `,
      },
      {
        path: "auction-results",
        Component: AuctionResultsRoute,
        query: graphql`
          query routes_AuctionResultsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...AuctionResults_artist
            }
          }
        `,
      },
      {
        path: "related-artists",
        Component: RelatedArtistsRoute,
        query: graphql`
          query routes_RelatedArtistsQuery($artistID: String!) {
            viewer {
              ...RelatedArtists_viewer
            }
          }
        `,
      },
      {
        path: "*",
        Component: props => {
          console.warn("Route not found: ", props)
          return <div>Page not found</div>
        },
      },
    ],
  },
]
