import { PriceRange } from "@artsy/palette"
import { FilterState } from "Apps/Search/FilterState"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"

interface Props {
  filters: FilterState
}

@track()
export class PriceRangeFilter extends React.Component<Props> {
  @track((props: Props, _state, [price_range]) => {
    return {
      action_type: Schema.ActionType.ClickedCommercialFilter,
      changed: { price_range },
      current: { ...props.filters.state },
    }
  })
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
