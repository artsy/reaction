import { Box, Separator } from "@artsy/palette"
import React from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { ColorFilter } from "./ColorFilter"
import { GalleryFilter } from "./GalleryFilter"
import { InstitutionFilter } from "./InstitutionFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeRangeFilter } from "./SizeRangeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

export const ArtworkFilters: React.FC = () => {
  const { showTopBorder } = useArtworkFilterContext()

  return (
    <Box pr={2}>
      {showTopBorder && (
        <Box pb={2}>
          <Separator />
        </Box>
      )}

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
