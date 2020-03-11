import React from "react"

import { Box, Button, Flex, Sans, Serif } from "@artsy/palette"

export const ArtistConsignMarketTrends: React.FC = props => {
  return (
    <Box>
      <Serif size="8">Market trends</Serif>
      <Flex>
        <Box>
          <Box>
            <Sans size="3">Highest realized price</Sans>
          </Box>
          <Box>
            <Sans size="2">All time</Sans>
          </Box>
          <Box>
            <Serif size="2">$300k</Serif>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">Sell through rate</Sans>
          </Box>
          <Box>
            <Sans size="2">Last 12 months</Sans>
          </Box>
          <Box>
            <Serif size="2">86%</Serif>
          </Box>
        </Box>
        <Box>
          <Box>
            <Sans size="3">Realized price over estimate</Sans>
          </Box>
          <Box>
            <Sans size="2">Last 12 months</Sans>
          </Box>
          <Box>
            <Serif size="2">176%</Serif>
          </Box>
        </Box>
      </Flex>

      <Box>
        <Button variant="primaryBlack">Explore auction results</Button>
      </Box>
    </Box>
  )
}
