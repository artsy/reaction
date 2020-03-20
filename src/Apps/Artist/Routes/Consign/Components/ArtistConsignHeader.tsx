import { Box, Button, Sans, Serif } from "@artsy/palette"
import React from "react"

import { RouterLink } from "Artsy/Router/RouterLink"
import { LightPurpleColor, SectionContainer } from "./SectionContainer"

interface ArtistConsignHeaderProps {
  artistName: string
}

export const ArtistConsignHeader: React.FC<ArtistConsignHeaderProps> = props => {
  return (
    <SectionContainer background={LightPurpleColor}>
      <Box textAlign="center">
        <Box>
          <Serif element="h1" size={["10", "12"]}>
            Sell Works by <br />
            {props.artistName}
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans element="h2" size="4t">
            With Artsy's expert guidance, selling is simple
          </Sans>
        </Box>

        <Box>
          <RouterLink to="/consign">
            <Button>Request a price estimate</Button>
          </RouterLink>
        </Box>
      </Box>
    </SectionContainer>
  )
}
