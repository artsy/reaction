import { graphql } from "react-relay"
import { ArtistApp } from "./ArtistApp"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRoute } from "./Routes/CV"
import { CVQuery } from "./Routes/CV/CVQuery"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { RelatedArtistsQuery } from "./Routes/RelatedArtists/RelatedArtistsQuery"
import { ShowsRoute } from "./Routes/Shows"
import { ShowsQuery } from "./Routes/Shows/ShowsQuery"

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
        query: CVQuery,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
          first: 10,
          at_a_fair: false,
          solo_show: true,
          sort: "start_at_desc",
          is_reference: true,
          visible_to_public: false,
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
          query routes_ResultsQueryRendererQuery(
            $artistID: String!
            $first: Int!
            $sort: AuctionResultSorts
          ) {
            artist(id: $artistID) {
              ...AuctionResultsRefetchContainer_artist
                @arguments(first: $first, sort: $sort)
            }
          }
        `,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
          status: "running",
          first: 10,
          // FIXME: Pull from state
          sort: "PRICE_AND_DATE_DESC",
        }),
      },
      {
        path: "related-artists",
        Component: RelatedArtistsRoute,
        query: RelatedArtistsQuery,
        prepareVariables: params => ({
          artistID: "pablo-picasso",
          first: 10,
          kind: "MAIN",
        }),
      },
    ],
  },
]
