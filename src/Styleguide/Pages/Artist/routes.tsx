import { ArtistApp } from "./ArtistApp"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRoute } from "./Routes/Shows"

export const routes = [
  {
    path: "/",
    Component: ArtistApp,
    children: [
      {
        path: "/",
        Component: Overview,
      },
      {
        path: "cv",
        Component: CVRoute,
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
