import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import { routes as auctionRoutes } from "Apps/Auction/routes"
import { collectRoutes } from "Apps/Collect2/collectRoutes"
import { conversationRoutes } from "Apps/Conversation/routes"
import { routes as identityVerificationRoutes } from "Apps/IdentityVerification/routes"
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
      routes: auctionRoutes,
    },
    {
      routes: collectRoutes,
    },
    {
      routes: conversationRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: searchRoutes,
    },
    {
      routes: identityVerificationRoutes,
    },
  ])
}
