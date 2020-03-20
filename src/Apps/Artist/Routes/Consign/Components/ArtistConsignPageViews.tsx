import React from "react"

import { Box, Sans, Spacer } from "@artsy/palette"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignPageViewsProps {
  artistConsignment: ArtistConsignment
  artistName: string
}

export const ArtistConsignPageViews: React.FC<ArtistConsignPageViewsProps> = props => {
  return (
    <SectionContainer background="black10">
      <Box textAlign="center">
        <Subheader>
          {props.artistName} works have received more than{" "}
          {props.artistConsignment.metadata.roundedViews} views on Artsy this
          month
        </Subheader>

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
