import { PriceRange } from "@artsy/palette"
import {
  MAX_PRICE,
  MIN_PRICE,
  useFilterContext,
} from "Apps/Search/FilterContext"
import React, { FC } from "react"

export const PriceRangeFilter: FC = () => {
  const filterContext = useFilterContext()

  const [initialMin, initialMax] = filterContext.rangeToTuple("price_range")
  return (
    <PriceRange
      allowCross={false}
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={50}
      disabledText="Disabled for biddable works"
      defaultValue={[initialMin, initialMax]}
      disabled={filterContext.filters.at_auction}
      onAfterChange={([min, max]) => {
        const minStr = min === MIN_PRICE ? "*" : min
        const maxStr = max === MAX_PRICE ? "*" : max

        filterContext.setFilter("price_range", `${minStr}-${maxStr}`)
      }}
    />
  )
}
