import { Box, Flex, Toggle } from "@artsy/palette"
import React from "react"

import { ColorFilter } from "./ColorFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeRangeFilters } from "./SizeRangeFilters"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

interface ArtworkFilterProps {
  mediums: Array<{
    id: string
    name: string
  }>
  timePeriods?: any
}

export const ArtworkFilters: React.FC<ArtworkFilterProps> = ({
  mediums,
  timePeriods,
}) => {
  return (
    <Box pr={2}>
      <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
        <WaysToBuyFilter />
      </Flex>

      <Toggle label="Medium" expanded>
        <Flex flexDirection="column" alignItems="left" mb={1}>
          <MediumFilter mediums={mediums} />
        </Flex>
      </Toggle>

      <Toggle label="Price" expanded>
        <Flex flexDirection="column" alignItems="left" my={1}>
          <PriceRangeFilter />
        </Flex>
      </Toggle>

      <Toggle label="Size">
        <Flex flexDirection="column" alignItems="left" my={1}>
          <SizeRangeFilters />
        </Flex>
      </Toggle>

      <Toggle label="Color">
        <Flex flexDirection="column" alignItems="center" my={1}>
          <ColorFilter />
        </Flex>
      </Toggle>

      <Toggle label="Time period">
        <Flex flexDirection="column" alignItems="center" my={1}>
          <TimePeriodFilter
            timePeriods={!!timePeriods ? timePeriods.map(a => a.name) : null}
          />
        </Flex>
      </Toggle>
    </Box>
  )
}
