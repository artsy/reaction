import { hasSections as showMarketInsights } from "Apps/Artist/Components/MarketInsights/MarketInsights"
import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "Components/v2/ArtworkFilter/ArtworkFilterContext"
import { isDefaultFilter } from "Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToCamelCase } from "Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Redirect, RedirectException, RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"
import { hasOverviewContent } from "./Components/NavigationTabs"

import ArtistApp from "./ArtistApp"
import ArticlesRoute from "./Routes/Articles"
import AuctionResultsRoute from "./Routes/AuctionResults"
import CVRoute from "./Routes/CV"
import OverviewRoute from "./Routes/Overview"
import ShowsRoute from "./Routes/Shows"
import WorksRoute from "./Routes/Works"

// import loadable from "@loadable/component"

graphql`
  fragment routes_Artist on Artist {
    slug
    statuses {
      shows
      cv(minShowCount: 0)
      articles
    }
    counts {
      forSaleArtworks
    }
    related {
      genes {
        edges {
          node {
            slug
          }
        }
      }
    }
    highlights {
      partnersConnection(
        first: 10
        displayOnPartnerProfile: true
        representedBy: true
        partnerCategory: ["blue-chip", "top-established", "top-emerging"]
      ) {
        edges {
          node {
            categories {
              slug
            }
          }
        }
      }
    }
    insights {
      type
    }
    biographyBlurb(format: HTML, partnerBio: true) {
      text
    }
  }
`

// FIXME:
// * `render` functions requires casting
// * `Redirect` needs to be casted, as it’s not compatible with `RouteConfig`
export const routes: RouteConfig[] = [
  {
    path: "/artist/:artistID",
    // getComponent: () => loadable(() => import("./ArtistApp")),
    Component: ArtistApp,
    query: graphql`
      query routes_ArtistTopLevelQuery($artistID: String!) @raw_response_type {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...routes_Artist @relay(mask: false)
        }
      }
    `,
    render: ({ Component, props, match }) => {
      if (Component && props) {
        const { artist } = props as any

        if (!artist) {
          return null
        }

        const showArtistInsights =
          showMarketInsights(artist) ||
          (artist.insights && artist.insights.length > 0)
        const hasArtistContent = hasOverviewContent(artist)

        const alreadyAtWorksForSalePath = match.location.pathname.includes(
          `${artist.slug}/works-for-sale`
        )

        const canShowOverview = showArtistInsights || hasArtistContent

        if (!canShowOverview && !alreadyAtWorksForSalePath) {
          throw new RedirectException(`${artist.slug}/works-for-sale`)
        }

        return <Component {...props} />
      }
    },
    children: [
      {
        path: "/",
        // getComponent: () => loadable(() => import("./Routes/Overview")),
        Component: OverviewRoute,
        displayNavigationTabs: true,
        query: graphql`
          query routes_OverviewQuery($artistID: String!) @raw_response_type {
            artist(id: $artistID) {
              ...Overview_artist
            }
          }
        `,
      },
      {
        path: "cv",
        // getComponent: () => loadable(() => import("./Routes/CV")),
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
        // getComponent: () => loadable(() => import("./Routes/Articles")),
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
        // getComponent: () => loadable(() => import("./Routes/Shows")),
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
        // getComponent: () => loadable(() => import("./Routes/AuctionResults")),
        Component: AuctionResultsRoute,
        displayNavigationTabs: true,
        query: graphql`
          query routes_AuctionResultsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...AuctionResults_artist
            }
          }
        `,
      },
      {
        path: "works-for-sale",
        // getComponent: () => loadable(() => import("./Routes/Works")),
        Component: WorksRoute,
        displayNavigationTabs: true,
        query: graphql`
          query routes_WorksQuery(
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation] = [
              MEDIUM
              TOTAL
              GALLERY
              INSTITUTION
              MAJOR_PERIOD
            ]
            $artistID: String!
            $atAuction: Boolean
            $attributionClass: [String]
            $color: String
            $forSale: Boolean
            $height: String
            $inquireableOnly: Boolean
            $keyword: String
            $majorPeriods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partnerID: ID
            $priceRange: String
            $sort: String
            $width: String
          ) @raw_response_type {
            artist(id: $artistID) {
              ...Works_artist
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  artistID: $artistID
                  atAuction: $atAuction
                  attributionClass: $attributionClass
                  color: $color
                  forSale: $forSale
                  height: $height
                  inquireableOnly: $inquireableOnly
                  keyword: $keyword
                  majorPeriods: $majorPeriods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  partnerID: $partnerID
                  priceRange: $priceRange
                  sort: $sort
                  width: $width
                )
            }
          }
        `,
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
