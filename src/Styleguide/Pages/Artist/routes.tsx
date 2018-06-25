import { graphql } from "react-relay"
import { ArtistApp } from "./ArtistApp"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRouteFragmentContainer as RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRouteFragmentContainer as ShowsRoute } from "./Routes/Shows"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"
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
        query: graphql`
          query routes_ShowsQuery($artistID: String!) {
            viewer {
              ...Shows_viewer
            }
          }
        `,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
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
