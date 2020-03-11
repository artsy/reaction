import React from "react"

import { Box, Button, Sans, Serif } from "@artsy/palette"

export const ArtistConsignHeader: React.FC = props => {
  return (
    <Box>
      <Serif size="8">Sell Works by Kehinde Wiley</Serif>
      <Sans size="3">With Artsy's expert guidance, selling is simple</Sans>
      <Button>Request a price estimate</Button>
    </Box>
  )
}
