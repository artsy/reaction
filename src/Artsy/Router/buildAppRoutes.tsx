import { Match, RouteConfig, Router, withRouter } from "found"
import { flatten } from "lodash"
import React, { useEffect } from "react"

import { AppShell } from "Apps/Components/AppShell"
import { useSystemContext } from "Artsy/SystemContext"
import { catchLinks } from "./Utils/catchLinks"

interface RouteList {
  routes: RouteConfig

  /**
   * Disabled routes are not mounted within global route
   */
  disabled?: boolean
}

export function buildAppRoutes(routeList: RouteList[]): RouteConfig[] {
  const routes = getActiveRoutes(routeList)

  const Component: React.FC<{
    children: React.ReactNode
    match: Match
    router: Router
  }> = props => {
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
        // FIXME: PR upstream; `matchRoutes` is missing from type definition
        // @ts-ignore
        const foundUrl = props.router.matcher.matchRoutes(routes, href)

        if (foundUrl) {
          const location = props.router.createLocation(href)
          const previousHref = window.location.href

          props.router.push({
            ...location,
            state: {
              previousHref,
            },
          })
        } else {
          window.location.assign(href)
        }
      })
    }, [])

    return <AppShell {...props} />
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      path: "",
      Component: withRouter(Component),
      children: routes,
    },
  ]
}

function getActiveRoutes(routeList) {
  const routes = flatten(
    routeList.reduce((acc, route: RouteList) => {
      if (route.disabled) {
        return acc
      } else {
        return acc.concat(route.routes)
      }
    }, [])
  ).map(createRouteConfiguration)
  return routes
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
