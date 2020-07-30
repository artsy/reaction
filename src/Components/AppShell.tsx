import { Box } from "@artsy/palette"
import { NetworkOfflineMonitor } from "Artsy/Router/NetworkOfflineMonitor"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { useMaybeReloadAfterInquirySignIn } from "Artsy/Router/Utils/useMaybeReloadAfterInquirySignIn"
import { Match } from "found"
import { isFunction } from "lodash"
import React, { useEffect } from "react"
import createLogger from "Utils/logger"

const logger = createLogger("Components/AppShell")

interface AppShellProps {
  children: React.ReactNode
  match: Match
}

export const AppShell: React.FC<AppShellProps> = props => {
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

  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady")
  }, [])

  // TODO: When old backbone inquiry modal goes away, this can be removed
  useMaybeReloadAfterInquirySignIn()

  return (
    <Box width="100%">
      <Box>
        <Box>{children}</Box>
      </Box>

      <NetworkOfflineMonitor />
    </Box>
  )
}
