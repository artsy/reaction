import { PriceRange } from "@artsy/palette"
import {
  FilterContextValues,
  MAX_PRICE,
  MIN_PRICE,
} from "Apps/Search/FilterContext"
import React from "react"

interface Props {
  filterContext: FilterContextValues
}

export class PriceRangeFilter extends React.Component<Props> {
  setRange(range) {
    const { filterContext } = this.props
    filterContext.setFilter("price_range", range)
  }

  render() {
    const { filterContext } = this.props
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

          this.setRange(`${minStr}-${maxStr}`)
        }}
      />
    )
  }
}
