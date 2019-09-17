import { Box } from "@artsy/palette"
import React from "react"

import { ColorFilter } from "./ColorFilter"
import { GalleryFilter } from "./GalleryFilter"
import { InstitutionFilter } from "./InstitutionFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeRangeFilter } from "./SizeRangeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

export const ArtworkFilters: React.FC = () => {
  return (
    <Box pr={2}>
      <WaysToBuyFilter />
      <MediumFilter />
      <PriceRangeFilter />
      <GalleryFilter />
      <InstitutionFilter />
      <SizeRangeFilter />
      <ColorFilter />
      <TimePeriodFilter />
    </Box>
  )
}
