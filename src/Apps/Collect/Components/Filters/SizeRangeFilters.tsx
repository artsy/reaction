import { LabeledRange } from "@artsy/palette"
import React from "react"
import { FilterState } from "../../FilterState"

export const SizeRangeFilters: React.FC<{
  filters: FilterState
}> = ({ filters }) => {
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
          filters.setFilter("height", `${minStr}-${maxStr}`)
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
          filters.setFilter("width", `${minStr}-${maxStr}`)
        }}
      />
    </>
  )
}
