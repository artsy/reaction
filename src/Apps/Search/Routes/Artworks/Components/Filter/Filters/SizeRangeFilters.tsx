import { LabeledRange } from "@artsy/palette"
import { FilterState } from "Apps/Search/FilterState"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"

interface Props {
  filters: FilterState
}

@track()
export class SizeRangeFilters extends React.Component<Props> {
  @track((props: Props, _state, [type, value]) => {
    return {
      action_type: Schema.ActionType.ClickedCommercialFilter,
      changed: { [type]: value },
      current: { ...props.filters.state },
    }
  })
  setRange(type, value) {
    const { filters } = this.props
    filters.setFilter(type, value)
  }
  render() {
    const { filters } = this.props
    const [initialMinHeight, initialMaxHeight] = filters.rangeToTuple("height")
    const [initialMinWidth, initialMaxWidth] = filters.rangeToTuple("width")
    return (
      <>
        <LabeledRange
          label="Height"
          allowCross={false}
          min={FilterState.MIN_HEIGHT}
          max={FilterState.MAX_HEIGHT}
          unit="in"
          step={1}
          defaultValue={[initialMinHeight, initialMaxHeight]}
          onAfterChange={([min, max]) => {
            const minStr = min === FilterState.MIN_HEIGHT ? "*" : min
            const maxStr = max === FilterState.MAX_HEIGHT ? "*" : max
            this.setRange("height", `${minStr}-${maxStr}`)
          }}
        />
        <LabeledRange
          label="Width"
          allowCross={false}
          min={FilterState.MIN_WIDTH}
          max={FilterState.MAX_WIDTH}
          unit="in"
          step={1}
          defaultValue={[initialMinWidth, initialMaxWidth]}
          onAfterChange={([min, max]) => {
            const minStr = min === FilterState.MIN_WIDTH ? "*" : min
            const maxStr = max === FilterState.MAX_WIDTH ? "*" : max
            this.setRange("width", `${minStr}-${maxStr}`)
          }}
        />
      </>
    )
  }
}
