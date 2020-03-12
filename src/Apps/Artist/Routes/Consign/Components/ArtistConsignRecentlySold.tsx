import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import React from "react"
import { SectionContainer } from "./SectionContainer"

export const ArtistConsignRecentlySold: React.FC = props => {
  return (
    <SectionContainer height={["100%", 620]}>
      <Box textAlign="center">
        <Box>
          <Box>
            <Serif size="10">Recently sold on Artsy</Serif>
          </Box>

          <Spacer my={1} />

          <Box>
            <Sans size="6">
              Works by Kehinde Wiley sold on Artsy in the past 12 months
            </Sans>
          </Box>

          <Spacer my={4} />

          <Box height={360}>TODO artwork blocks</Box>
        </Box>
      </Box>
    </SectionContainer>
  )
}
