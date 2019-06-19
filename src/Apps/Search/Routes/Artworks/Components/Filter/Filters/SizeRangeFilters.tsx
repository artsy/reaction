import { LabeledRange } from "@artsy/palette"
import {
  FilterContextValues,
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "Apps/Search/FilterContext"
import React from "react"

interface Props {
  filterContext: FilterContextValues
}

export class SizeRangeFilters extends React.Component<Props> {
  setRange(type, value) {
    const { filterContext } = this.props
    filterContext.setFilter(type, value)
  }
  render() {
    const { filterContext } = this.props
    const [initialMinHeight, initialMaxHeight] = filterContext.rangeToTuple(
      "height"
    )
    const [initialMinWidth, initialMaxWidth] = filterContext.rangeToTuple(
      "width"
    )
    return (
      <>
        <LabeledRange
          label="Height"
          allowCross={false}
          min={MIN_HEIGHT}
          max={MAX_HEIGHT}
          unit="in"
          step={1}
          defaultValue={[initialMinHeight, initialMaxHeight]}
          onAfterChange={([min, max]) => {
            const minStr = min === MIN_HEIGHT ? "*" : min
            const maxStr = max === MAX_HEIGHT ? "*" : max
            this.setRange("height", `${minStr}-${maxStr}`)
          }}
        />
        <LabeledRange
          label="Width"
          allowCross={false}
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          unit="in"
          step={1}
          defaultValue={[initialMinWidth, initialMaxWidth]}
          onAfterChange={([min, max]) => {
            const minStr = min === MIN_WIDTH ? "*" : min
            const maxStr = max === MAX_WIDTH ? "*" : max
            this.setRange("width", `${minStr}-${maxStr}`)
          }}
        />
      </>
    )
  }
}
