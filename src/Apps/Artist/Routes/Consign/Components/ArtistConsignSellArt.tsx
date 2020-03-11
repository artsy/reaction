import React from "react"

import { Box, Button, Sans, Serif } from "@artsy/palette"

export const ArtistConsignSellArt: React.FC = props => {
  return (
    <Box>
      <Box>
        <Serif size="10">Sell Art From Your Collection</Serif>
      </Box>
      <Box>
        <Sans size="3">With Artsy's expert guidance, selling is simple</Sans>
      </Box>
      <Box>
        <Button>Request a price estimate</Button>
      </Box>
    </Box>
  )
}
