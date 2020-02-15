import { Box } from "@artsy/palette"
import React from "react"

import { useSystemContext } from "Artsy"
import { NavBar } from "Components/NavBar"

/**
 * Ensure the default nav doesn't show for a subset of routes that manage their
 * own custom nav bar.
 *
 * TODO: Move this setting to the routes definition for the app in question.
 */
const HIDE_DEFAULT_NAV_FOR_ROUTES = ["/orders/"]

export const AppShell = props => {
  const { children, match } = props
  const { isFetching } = useSystemContext()
  const showNav =
    !isFetching &&
    HIDE_DEFAULT_NAV_FOR_ROUTES.some(
      path => !match.location.pathname.includes(path)
    )

  return (
    <Box width="100%">
      {showNav && (
        <Box pb={6}>
          <Box left={0} position="fixed" width="100%" zIndex={100}>
            <NavBar />
          </Box>
        </Box>
      )}

      <Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}
