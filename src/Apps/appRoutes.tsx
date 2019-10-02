import { flatten } from "lodash"

import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import { collectRoutes } from "Apps/Collect2/collectRoutes"
import { routes as searchRoutes } from "Apps/Search/routes"
import { RouteConfig } from "found"
import { AppShell } from "./Components/AppShell"

export const appRoutes: RouteConfig[] = makeAppRoutes(
  artistRoutes,
  artworkRoutes,
  collectRoutes,
  searchRoutes
)

function makeAppRoutes(...routeList) {
  const routes = flatten(routeList).map(route => {
    let path = route.path
    if (path.slice(-1) === "/") {
      path = route.path.substring(1) // remove leading slash
    }

    return {
      ...route,
      path,
    }
  })

  return [
    {
      Component: AppShell,
      children: routes,
    },
  ]
}
