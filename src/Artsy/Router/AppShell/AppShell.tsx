import { RouteConfig } from "found"
import React from "react"

import { Box } from "@artsy/palette"
import { MockRouter } from "DevTools"
import { appShellRoutes } from "./routes"

export const AppShell: React.FC<{
  initialRoute?: string
  routes?: RouteConfig[]
}> = ({ initialRoute = "/", ...props }) => {
  return (
    <Box>
      <MockRouter initialRoute={initialRoute} routes={appShellRoutes} />
    </Box>
  )
}
