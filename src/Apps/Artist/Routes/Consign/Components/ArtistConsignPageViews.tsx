import React from "react"

import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const ArtistConsignPageViews: React.FC = props => {
  return (
    <SectionContainer height={260} background="black10">
      <Box textAlign="center">
        <Box>
          <Serif size="10">
            Kehinde Wiley works have received more than 10,000 views on Artsy
            this month
          </Serif>
        </Box>

        <Spacer my={1} />

        <Box>
          <Sans size="6">
            Over 60 Artsy collectors are looking for works by this artist
          </Sans>
        </Box>
      </Box>
    </SectionContainer>
  )
}
