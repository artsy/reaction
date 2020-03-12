import React from "react"

import { Box, Button, color, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const ArtistConsignMarketTrends: React.FC = props => {
  return (
    <SectionContainer height={440} background="black100">
      <Box textAlign="center" width="100%" px={6}>
        <Serif size="10" color="white">
          Market trends
        </Serif>

        <Spacer mb={4} />

        <Flex justifyContent="space-evenly">
          <Box width={335} height={140}>
            <Box>
              <Sans size="6" weight="medium" color="white">
                Highest realized price
              </Sans>
            </Box>
            <Box>
              <Sans size="4" color={color("black10")}>
                All time
              </Sans>
            </Box>
            <Box>
              <Serif size="12" color="white">
                $300k
              </Serif>
            </Box>
          </Box>
          <Box width={335} height={140}>
            <Box>
              <Sans size="6" weight="medium" color="white">
                Sell through rate
              </Sans>
            </Box>
            <Box>
              <Sans size="4" color={color("black10")}>
                Last 12 months
              </Sans>
            </Box>
            <Box>
              <Serif size="12" color="white">
                86%
              </Serif>
            </Box>
          </Box>
          <Box width={335} height={140}>
            <Box>
              <Sans size="6" weight="medium" color="white">
                Realized price over estimate
              </Sans>
            </Box>
            <Box>
              <Sans size="4" color={color("black10")}>
                Last 12 months
              </Sans>
            </Box>
            <Box>
              <Serif size="12" color="white">
                176%
              </Serif>
            </Box>
          </Box>
        </Flex>

        <Spacer mt={4} />

        <Box>
          <Button variant="primaryWhite">Explore auction results</Button>
        </Box>
      </Box>
    </SectionContainer>
  )
}
