import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import { collectRoutes } from "Apps/Collect2/collectRoutes"
import { routes as orderRoutes } from "Apps/Order/routes"
import { routes as searchRoutes } from "Apps/Search/routes"
import { makeAppRoutes } from "Artsy/Router/makeAppRoutes"
import { RouteConfig } from "found"

export function getAppRoutes(): RouteConfig[] {
  return makeAppRoutes([
    {
      routes: artistRoutes,
    },
    {
      routes: artworkRoutes,
    },
    {
      routes: collectRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: searchRoutes,
    },
  ])
}
