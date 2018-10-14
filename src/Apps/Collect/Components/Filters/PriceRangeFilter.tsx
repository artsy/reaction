import { SystemProps } from "Artsy/SystemContext"
import React from "react"
import { PriceRange } from "Styleguide/Components/PriceRange"
import { FilterState } from "../../FilterState"

export const PriceRangeFilter: React.SFC<{
  filters: FilterState
  mediator: SystemProps["mediator"]
}> = ({ filters, mediator }) => {
  const [initialMin, initialMax] = filters.priceRangeToTuple()

  return (
    <PriceRange
      allowCross={false}
      min={FilterState.MIN_PRICE}
      max={FilterState.MAX_PRICE}
      step={50}
      defaultValue={[initialMin, initialMax]}
      disabled={filters.state.at_auction}
      onAfterChange={([min, max]) => {
        const minStr = min === FilterState.MIN_PRICE ? "*" : min
        const maxStr = max === FilterState.MAX_PRICE ? "*" : max

        filters.setFilter("price_range", `${minStr}-${maxStr}`, mediator)
      }}
    />
  )
}
