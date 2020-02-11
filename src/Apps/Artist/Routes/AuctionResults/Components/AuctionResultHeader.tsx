import { Box, Sans, Serif } from "@artsy/palette"
import React from "react"

export const AuctionResultHeader = () => {
  return (
    <Box pb={2}>
      <Sans size="5t">Auction results</Sans>
      <Serif size="3" color="black100">
        Some copy about definitions and methodology and link to it here.
      </Serif>
    </Box>
  )
}
