import { Box, Flex, Toggle } from "@artsy/palette"
import React from "react"

import { ColorFilter } from "./ColorFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeRangeFilter } from "./SizeRangeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

export const ArtworkFilters: React.FC = () => {
  return (
    <Box pr={2}>
      <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
        <WaysToBuyFilter />
      </Flex>

      <Toggle label="Medium" expanded>
        <Flex flexDirection="column" alignItems="left" mb={1}>
          <MediumFilter />
        </Flex>
      </Toggle>

      <Toggle label="Price" expanded>
        <Flex flexDirection="column" alignItems="left" my={1}>
          <PriceRangeFilter />
        </Flex>
      </Toggle>

      <Toggle label="Size">
        <Flex flexDirection="column" alignItems="left" my={1}>
          <SizeRangeFilter />
        </Flex>
      </Toggle>

      <Toggle label="Color">
        <Flex flexDirection="column" alignItems="center" my={1}>
          <ColorFilter />
        </Flex>
      </Toggle>

      <Toggle label="Time period">
        <Flex flexDirection="column" my={1}>
          <TimePeriodFilter />
        </Flex>
      </Toggle>
    </Box>
  )
}
