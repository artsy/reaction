import { Flex, PriceRange, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { MAX_PRICE, MIN_PRICE } from "../Utils/rangeToTuple"

export const PriceRangeFilter: FC = () => {
  const filterContext = useArtworkFilterContext()
  const [initialMin, initialMax] = filterContext.rangeToTuple("price_range")

  return (
    <Toggle label="Price" expanded>
      <Flex flexDirection="column" alignItems="left" my={1}>
        <PriceRange
          allowCross={false}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={50}
          disabledText="Disabled for biddable works"
          defaultValue={[initialMin, initialMax]}
          disabled={Boolean(filterContext.filters.at_auction)}
          onAfterChange={([min, max]) => {
            const minStr = min === MIN_PRICE ? "*" : min
            const maxStr = max === MAX_PRICE ? "*" : max

            filterContext.setFilter("price_range", `${minStr}-${maxStr}`)
          }}
        />
      </Flex>
    </Toggle>
  )
}
