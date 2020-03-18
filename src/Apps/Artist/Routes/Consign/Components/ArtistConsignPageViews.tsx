import React from "react"

import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { SectionContainer } from "./SectionContainer"

interface ArtistConsignPageViewsProps {
  artistConsignment: ArtistConsignment
  artistName: string
}

export const ArtistConsignPageViews: React.FC<ArtistConsignPageViewsProps> = props => {
  return (
    <SectionContainer background="black10">
      <Box textAlign="center">
        <Box>
          <Serif size="10">
            {props.artistName} works have received more than{" "}
            {props.artistConsignment.metadata.roundedViews} views on Artsy this
            month
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
