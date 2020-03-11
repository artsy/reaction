import React from "react"

import { Box, Sans, Serif } from "@artsy/palette"

export const ArtistConsignRecentlySold: React.FC = props => {
  return (
    <Box>
      <Serif size="6">Recently sold on Artsy</Serif>
      <Sans size="3">
        Works by Kehinde Wiley sold on Artsy in the past 12 months
      </Sans>
      <Box>TODO artwork blocks</Box>
    </Box>
  )
}
