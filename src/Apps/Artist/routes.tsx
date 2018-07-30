import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React from "react"
import { graphql } from "react-relay"
import { Provider } from "unstated"
import { ArtistAppFragmentContainer as ArtistApp } from "./ArtistApp"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRouteFragmentContainer as CVRoute } from "./Routes/CV"
import { OverviewRouteFragmentContainer as OverviewRoute } from "./Routes/Overview"
import { RelatedArtistsRouteFragmentContainer as RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRouteFragmentContainer as ShowsRoute } from "./Routes/Shows"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"
// @ts-ignore
import { ArtistAppProps } from "./ArtistApp"
// @ts-ignore
import { ArticlesRouteProps } from "./Routes/Articles"
// @ts-ignore
import { AuctionResultRouteProps } from "./Routes/AuctionResults"
// @ts-ignore
import { CVRouteProps } from "./Routes/CV"
// @ts-ignore
import { OverviewRouteProps } from "./Routes/Overview"
// @ts-ignore
import { RelatedArtistsProps } from "./Routes/RelatedArtists"
// @ts-ignore
import { ShowProps } from "./Routes/Shows"

//
// ---------

export const routes = [
  {
    path: "/artist/:artistID",
    Component: ArtistApp,
    query: graphql`
      query routes_ArtistTopLevelQuery($artistID: String!) {
        artist(id: $artistID) {
          ...ArtistApp_artist
        }
        me {
          ...ArtistApp_me
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: OverviewRoute,
        render: ({ props, Component }) => {
          if (!props) {
            return null
          }

          return (
            <Provider inject={[new FilterState(props.location.query)]}>
              <Component artist={props.artist} />
            </Provider>
          )
        },
        prepareVariables: (params, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const initialFilterState = props.location ? props.location.query : {}
          return { ...initialFilterState, ...params }
        },
        query: graphql`
          query routes_OverviewQueryRendererQuery(
            $artistID: String!
            $medium: String
            $major_periods: [String]
            $partner_id: ID
            $for_sale: Boolean
            $sort: String
          ) {
            artist(id: $artistID) {
              ...Overview_artist
                @arguments(
                  medium: $medium
                  major_periods: $major_periods
                  partner_id: $partner_id
                  for_sale: $for_sale
                  sort: $sort
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
