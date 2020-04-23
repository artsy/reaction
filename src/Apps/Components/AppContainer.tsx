import { Box, breakpoints } from "@artsy/palette"
import { useSystemContext } from "Artsy"
import React from "react"

interface AppContainerProps {
  children: React.ReactNode
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const { appMaxWidth = breakpoints.xl } = useSystemContext()

  return (
    <Box width="100%" maxWidth={appMaxWidth} m="auto">
      {children}
    </Box>
  )
}
