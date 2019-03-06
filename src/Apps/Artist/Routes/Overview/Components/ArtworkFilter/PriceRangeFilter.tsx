import { PriceRange } from "@artsy/palette"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"

export const PriceRangeFilter: React.SFC<{
  filters: FilterState
}> = ({ filters }) => {
  const [initialMin, initialMax] = filters.priceRangeToTuple()
  return (
    <ContextConsumer>
      {({ mediator }) => (
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
      )}
    </ContextConsumer>
  )
}
