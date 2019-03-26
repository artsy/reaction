import { PriceRange } from "@artsy/palette"
import { FilterState } from "Apps/Search/FilterState"
import React from "react"

interface Props {
  filters: FilterState
}

export class PriceRangeFilter extends React.Component<Props> {
  setRange(range) {
    const { filters } = this.props
    filters.setFilter("price_range", range)
  }

  render() {
    const { filters } = this.props
    const [initialMin, initialMax] = filters.rangeToTuple("price_range")
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

          this.setRange(`${minStr}-${maxStr}`)
        }}
      />
    )
  }
}
