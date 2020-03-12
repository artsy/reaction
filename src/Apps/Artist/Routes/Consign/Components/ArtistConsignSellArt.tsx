import React from "react"

import { Box, Button, Sans, Serif } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const ArtistConsignSellArt: React.FC = props => {
  return (
    <SectionContainer height={400} background="#EAE5E7">
      <Box textAlign="center">
        <Box>
          <Serif size="12">
            Sell Art <br />
            From Your Collection
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans size="4t">With Artsy's expert guidance, selling is simple</Sans>
        </Box>

        <Box>
          <Button>Request a price estimate</Button>
        </Box>
      </Box>
    </SectionContainer>
  )
}
