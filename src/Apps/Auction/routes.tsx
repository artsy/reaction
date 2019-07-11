// import { getRedirect } from "Apps/Order/getRedirect"
// import { confirmRouteExit, redirects } from "Apps/Order/redirects"
import { RouteConfig } from "found"
// import { graphql } from "react-relay"
import { AuctionApp } from "./AuctionApp"

// import { RegisterFragmentContainer as RegisterRoute } from "Apps/Auction/Routes/Register"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { ErrorPage } from "Components/ErrorPage"

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/auction-registration/:saleSlug",
    Component: AuctionApp,
  },
]
