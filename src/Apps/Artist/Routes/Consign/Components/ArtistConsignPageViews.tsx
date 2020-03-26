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
  const {
    artistName,
    artistConsignment: {
      metadata: { roundedViews, roundedUniqueVisitors },
    },
  } = props
  return (
    <SectionContainer background="black10">
      <Box textAlign="center">
        <Subheader>
          {artistName} works have received more than {roundedViews} views on
          Artsy this month
        </Subheader>

        <Spacer my={1} />

        <Box>
          <Sans size="6">
            Over {roundedUniqueVisitors} Artsy collectors are looking for works
            by this artist
          </Sans>
        </Box>
      </Box>
    </SectionContainer>
  )
}
