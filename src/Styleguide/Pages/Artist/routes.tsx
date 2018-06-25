import { graphql } from "react-relay"
import { ArtistApp } from "./ArtistApp"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRouteFragmentContainer as RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRoute } from "./Routes/Shows"
import { ShowsQuery } from "./Routes/Shows/ShowsQuery"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"
// @ts-ignore
import { AuctionResultProps } from "./Routes/AuctionResults"
// @ts-ignore
import { CVRouteProps } from "./Routes/CV"
// @ts-ignore
import { RelatedArtistsProps } from "./Routes/RelatedArtists"

export const routes = [
  {
    path: "/",
    Component: ArtistApp,
    query: graphql`
      query routes_OverviewQueryRendererQuery($artistID: String!) {
        artist(id: $artistID) {
          ...ArtistHeader_artist
        }
      }
    `,
    prepareVariables: params => ({
      artistID: "pablo-picasso",
    }),

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
        prepareVariables: params => ({
          artistID: "pablo-picasso",
        }),
      },
      {
        path: "articles",
        Component: ArticlesRoute,
        query: graphql`
          query routes_ArticlesQueryRendererQuery(
            $artistID: String!
            $first: Int!
          ) {
            artist(id: $artistID) {
              ...ArticlesRefetchContainer_artist @arguments(first: $first)
            }
          }
        `,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
          first: 10,
        }),
      },
      {
        path: "shows",
        Component: ShowsRoute,
        query: ShowsQuery,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
          status: "running",
          sort: "end_at_asc",
          first: 10,
        }),
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
        prepareVariables: params => ({
          artistID: "pablo-picasso",
        }),
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
        prepareVariables: params => ({
          artistID: "pablo-picasso",
        }),
      },
    ],
  },
]
