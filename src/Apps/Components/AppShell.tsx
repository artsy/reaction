import { Box } from "@artsy/palette"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { NavBar } from "Components/NavBar"
import { isFunction } from "lodash"
import React, { useEffect } from "react"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Components/AppShell")

export const AppShell = props => {
  const { children, match } = props
  const routeConfig = findCurrentRoute(match)

  /**
   * Check to see if a route has a prepare key; if so call it. Used typically to
   * preload bundle-split components (import()) while the route is fetching data
   * in the background.
   */
  useEffect(() => {
    if (isFunction(routeConfig.prepare)) {
      try {
        routeConfig.prepare()
      } catch (error) {
        logger.error(error)
      }
    }
  }, [routeConfig])

  return (
    <Box width="100%">
      <Box pb={6}>
        <Box left={0} position="fixed" width="100%" zIndex={100}>
          <NavBar />
        </Box>
      </Box>

      <Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}
