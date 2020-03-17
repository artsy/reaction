import { Box, Button, Sans, Serif } from "@artsy/palette"
import React from "react"

import { LightPurpleColor, SectionContainer } from "./SectionContainer"

interface ArtistConsignHeaderProps {
  artistName: string
}

export const ArtistConsignHeader: React.FC<ArtistConsignHeaderProps> = props => {
  return (
    <SectionContainer background={LightPurpleColor}>
      <Box textAlign="center">
        <Box>
          <Serif size={["10", "12"]}>
            Sell Works by <br />
            {props.artistName}
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
