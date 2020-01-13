import { RouteConfig, withRouter } from "found"
import { flatten } from "lodash"
import React, { useEffect } from "react"

import { AppShell } from "Apps/Components/AppShell"
import { trackPageView } from "Artsy"
import { useSystemContext } from "Artsy/SystemContext"
import { catchLinks } from "Utils/catchLinks"

const ROUTE_NAMESPACE = ""

interface RouteList {
  routes: RouteConfig

  /**
   * Disabled routes are not mounted within global route
   */
  disabled?: boolean
}

export function makeAppRoutes(routeList: RouteList[]): RouteConfig[] {
  function removeDisabledRoutes(acc, route: RouteList) {
    if (route.disabled) {
      return acc
    } else {
      return acc.concat(route.routes)
    }
  }

  function createRouteConfiguration(route): RouteConfig {
    let path = route.path
    if (path.slice(-1) === "/") {
      path = route.path.substring(1) // remove leading slash from route
    }

    return {
      ...route,
      fetchIndicator: "overlay",
      path,
    }
  }

  // Build route list
  const routes = flatten(routeList.reduce(removeDisabledRoutes, [])).map(
    createRouteConfiguration
  )

  const Component = props => {
    const { router, setRouter } = useSystemContext()
    // Store global reference to router instance
    useEffect(() => {
      if (props.router !== router) {
        setRouter(props.router)
      }

      /**
       * Intercept <a> tags on page and if contained within router route
       * manifest, navigate via router versus doing a hard jump between pages.
       */
      catchLinks(window, href => {
        const url = ROUTE_NAMESPACE + href
        const foundUrl = props.router.matcher.matchRoutes(routes, url)
        // Make sure to track pageviews when staying on the same page type.
        // Collection pages link to each other using `RouterLink` which already
        // handles this, so just in case avoid double triggering.
        if (foundUrl) {
          const toPath = url.toString()
          // TODO: Figure out why the router prop is stale.
          // const currentPageType = props.match.location.pathname.split("/")[1]
          const currentPageType = window.location.pathname.split("/")[1]
          const toPageType = toPath.split("/")[1]
          if (currentPageType === toPageType && toPageType !== "collection") {
            trackPageView({ path: toPath })
          }
          props.router.push(url)
        } else {
          window.location.assign(url)
        }
      })
    }, [])

    return <AppShell {...props} />
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      path: ROUTE_NAMESPACE,

      Component: withRouter(Component),
      children: routes,
    },
  ]
}
