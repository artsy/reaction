import { PriceRange } from "@artsy/palette"
import React from "react"
import { FilterState } from "../../FilterState"

export const PriceRangeFilter: React.FC<{
  filters: FilterState
}> = ({ filters }) => {
  const [initialMin, initialMax] = filters.rangeToTuple("price_range")
  return (
    <PriceRange
      allowCross={false}
      min={FilterState.MIN_PRICE}
      max={FilterState.MAX_PRICE}
      step={50}
      disabledText="Disabled for biddable works"
      defaultValue={[initialMin, initialMax]}
      disabled={filters.state.at_auction}
      onAfterChange={([min, max]) => {
        const minStr = min === FilterState.MIN_PRICE ? "*" : min
        const maxStr = max === FilterState.MAX_PRICE ? "*" : max

        filters.setFilter("price_range", `${minStr}-${maxStr}`)
      }}
    />
  )
}
