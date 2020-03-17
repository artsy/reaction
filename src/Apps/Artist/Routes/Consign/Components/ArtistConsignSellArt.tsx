import React from "react"

import { Box, Button, Sans, Serif } from "@artsy/palette"
import { LightPurpleColor, SectionContainer } from "./SectionContainer"

export const ArtistConsignSellArt: React.FC = props => {
  return (
    <SectionContainer background={LightPurpleColor}>
      <Box textAlign="center">
        <Box>
          <Serif size={["10", "12"]}>
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
