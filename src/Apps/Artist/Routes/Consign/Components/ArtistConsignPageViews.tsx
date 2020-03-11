import React from "react"

import { Box, Sans, Serif } from "@artsy/palette"

export const ArtistConsignPageViews: React.FC = props => {
  return (
    <Box>
      <Serif size="8">
        Kehinde Wiley works have received more than 10,000 views on Artsy this
        month
      </Serif>
      <Sans size="3">
        Over 60 Artsy collectors are looking for works by this artist
      </Sans>
    </Box>
  )
}
