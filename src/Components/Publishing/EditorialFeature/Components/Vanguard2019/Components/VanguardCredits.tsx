import { Box, Sans } from "@artsy/palette"
import React from "react"

export const VanguardCredits = isMobile => {
  return (
    <Box textAlign="center" pt={isMobile ? 0 : 50}>
      <Sans size="3t" weight="medium">
        Videos by Alex John Beck
      </Sans>
      <Sans size="3t" weight="medium">
        Video Editing by Nate DeYoung
      </Sans>
      <Sans size="3t" weight="medium">
        Interaction Design by Wax Studios
      </Sans>
    </Box>
  )
}
