import { Box, Button, color, Flex, Sans, Serif } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { SectionContainer } from "./SectionContainer"

const Statistic: React.FC<{ top: string; middle: string; bottom: string }> = ({
  top,
  middle,
  bottom,
}) => {
  return (
    <Box width={["100%", 335]} py={[2, 0]}>
      <Box>
        <Sans size="6" weight="medium" color="white">
          {top}
        </Sans>
      </Box>
      <Box>
        <Sans size="4" color={color("black10")}>
          {middle}
        </Sans>
      </Box>
      <Box>
        <Serif size="12" color="white">
          {bottom}
        </Serif>
      </Box>
    </Box>
  )
}

interface ArtistConsignMarketTrendsProps {
  artistConsignment: ArtistConsignment
  artistID: string
}

export const ArtistConsignMarketTrends: React.FC<ArtistConsignMarketTrendsProps> = ({
  artistConsignment,
  artistID,
}) => {
  const {
    metadata: { highestRealized, str, realized },
  } = artistConsignment

  return (
    <SectionContainer background="black100">
      <Box textAlign="center" width="100%" px={6}>
        <Serif size="10" color="white">
          Market trends
        </Serif>

        <Box my={[2, 4]}>
          <Flex justifyContent="space-evenly" flexDirection={["column", "row"]}>
            <Statistic
              top="Highest realized price"
              middle="All time"
              bottom={highestRealized}
            />
            <Statistic
              top="Sell through rate"
              middle="Last 12 months"
              bottom={str}
            />
            <Statistic
              top="Realized price over estimate"
              middle="Last 12 months"
              bottom={realized}
            />
          </Flex>
        </Box>

        <Box>
          <RouterLink to={`/artist/${artistID}/auction-results`}>
            <Button variant="primaryWhite">Explore auction results</Button>
          </RouterLink>
        </Box>
      </Box>
    </SectionContainer>
  )
}
