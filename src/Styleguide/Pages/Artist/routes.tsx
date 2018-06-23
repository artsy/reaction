import { graphql } from "react-relay"
import { ArtistApp } from "./ArtistApp"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRoute } from "./Routes/CV"
import { CVQuery } from "./Routes/CV/CVQuery"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRoute } from "./Routes/Shows"

export const routes = [
  {
    path: "/",
    Component: ArtistApp,
    prepareVariables: params => ({
      artistID: "pablo-picasso",
    }),
    query: graphql`
      query routesQuery($artistID: String!) {
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
      },
      {
        path: "shows",
        Component: ShowsRoute,
      },
      {
        path: "auction-results",
        Component: AuctionResultsRoute,
      },
      {
        path: "related-artists",
        Component: RelatedArtistsRoute,
      },
    ],
  },
]
