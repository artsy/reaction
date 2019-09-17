import {
  initialState,
  isDefaultFilter,
} from "Apps/Artist/Routes/Overview/state"
import { Redirect, RouteConfig } from "found"
import { graphql } from "react-relay"
import { ArtistAppFragmentContainer as ArtistApp } from "./ArtistApp"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import { OverviewRouteFragmentContainer as OverviewRoute } from "./Routes/Overview"
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
        prepareVariables: (params, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const filterStateFromUrl = props.location ? props.location.query : {}
          const filterParams = {
            ...initialState,
            ...filterStateFromUrl,
            ...params,
          }

          filterParams.hasFilter = Object.entries(filterStateFromUrl).some(
            ([k, v]) => {
              return !isDefaultFilter(k, v)
            }
          )

          return filterParams
        },
        query: graphql`
          query routes_OverviewQueryRendererQuery(
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation] = [
              MEDIUM
              TOTAL
              GALLERY
              INSTITUTION
              MAJOR_PERIOD
            ]
            $artistID: String!
            $at_auction: Boolean
            $attribution_class: [String]
            $color: String
            $for_sale: Boolean
            $hasFilter: Boolean!
            $height: String
            $inquireable_only: Boolean
            $major_periods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partner_id: ID
            $price_range: String
            $sort: String
            $width: String
          ) {
            # FIXME: Remove this top-level field
            artist(id: $artistID) {
              ...Overview_artist @arguments(hasFilter: $hasFilter)
            }
            viewer {
              artist(id: $artistID) {
                counts {
                  for_sale_artworks
                  ecommerce_artworks
                  auction_artworks
                  artworks
                  has_make_offer_artworks
                }
              }
              ...ArtworkFilter_viewer
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  artist_id: $artistID
                  at_auction: $at_auction
                  attribution_class: $attribution_class
                  color: $color
                  for_sale: $for_sale
                  height: $height
                  inquireable_only: $inquireable_only
                  major_periods: $major_periods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  partner_id: $partner_id
                  price_range: $price_range
                  sort: $sort
                  width: $width
                )
            }
          }
        `,
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
