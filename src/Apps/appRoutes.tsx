import catchLinks from "catch-links"
import { flatten } from "lodash"
import React from "react"

import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import { collectRoutes } from "Apps/Collect2/collectRoutes"
import { routes as searchRoutes } from "Apps/Search/routes"
import { AppShell } from "./Components/AppShell"

const ROUTE_NAMESPACE = ""

export const appRoutes = makeAppRoutes(
  artistRoutes,
  artworkRoutes,
  collectRoutes,
  searchRoutes
)

function makeAppRoutes(...routeList) {
  const routes = flatten(routeList).map(route => {
    let path = route.path
    if (path.slice(-1) === "/") {
      path = route.path.substring(1) // remove leading slash from route
    }

    return {
      ...route,
      fetchIndicator: "overlay",
      path,
    }
  })

  return [
    {
      Component: props => {
        catchLinks(window, href => {
          const url = ROUTE_NAMESPACE + href
          const foundUrl = props.router.matcher.matchRoutes(routes, url)

          if (foundUrl) {
            props.router.push(url)
          } else {
            window.location.assign(url)
          }
        })

        return <AppShell {...props} />
      },
      children: routes,
    },
  ]
}
