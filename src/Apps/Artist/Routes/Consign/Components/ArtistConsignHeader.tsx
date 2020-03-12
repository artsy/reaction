import { Box, Button, Sans, Serif } from "@artsy/palette"
import React from "react"

import { SectionContainer } from "./SectionContainer"

export const ArtistConsignHeader: React.FC = props => {
  return (
    <SectionContainer height={[630, 426]} background="#EAE5E7">
      <Box textAlign="center">
        <Box>
          <Serif size={["10", "12"]}>
            Sell Works by <br />
            Kehinde Wiley
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
