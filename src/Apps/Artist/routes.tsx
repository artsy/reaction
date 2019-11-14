import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { isDefaultFilter } from "Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToCamelCase } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Redirect, RouteConfig } from "found"
import { graphql } from "react-relay"
import { ArtistAppFragmentContainer as ArtistApp } from "./ArtistApp"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import {
  ArtistOverviewQuery,
  OverviewRouteFragmentContainer as OverviewRoute,
} from "./Routes/Overview"
import { ShowsRouteFragmentContainer as ShowsRoute } from "./Routes/Shows"

// FIXME:
// * `render` functions requires casting
// * `Redirect` needs to be casted, as it’s not compatible with `RouteConfig`
export const routes: RouteConfig[] = [
  {
    path: "/artist/:artistID",
    Component: ArtistApp,
    query: graphql`
      query routes_ArtistTopLevelQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: OverviewRoute,
        query: ArtistOverviewQuery,
        prepareVariables: (params, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const filterStateFromUrl = props.location ? props.location.query : {}

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
            ...params,
          }

          filterParams.hasFilter = Object.entries(filterParams).some(
            ([k, v]: [keyof ArtworkFilters, any]) => {
              return !isDefaultFilter(k, v)
            }
          )

          return filterParams
        },
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
      // Redirect all unhandled tabs to the artist page.
      // Note: there is a deep-linked standalone auction-lot page
      // in Force, under /artist/:artistID/auction-result/:id.
      // That app needs to be mounted before this app for that to work,
      // and not get caught here.
      new Redirect({
        from: "*",
        to: "/artist/:artistID",
      }) as any,
    ],
  },
]
