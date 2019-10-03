import { RouteConfig } from "found"
import { flatten } from "lodash"
import React, { useEffect } from "react"

import { AppShell } from "Apps/Components/AppShell"
import { useSystemContext } from "Artsy/SystemContext"
import { catchLinks } from "Utils/catchLinks"

const ROUTE_NAMESPACE = "experimental-app-shell"

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

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      Component: props => {
        const { router, setRouter } = useSystemContext()

        // Store global reference to router instance
        useEffect(() => {
          if (props.router !== router) {
            setRouter(props.router)
          }
        }, [])

        /**
         * Intercept <a> tags on page and if contained within router route
         * manifest, navigate via router versus doing a hard jump between pages.
         */
        catchLinks(window, href => {
          const url = ROUTE_NAMESPACE + href
          const foundUrl = props.router.matcher.matchRoutes(routes, url)

          console.log("here!@")

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
