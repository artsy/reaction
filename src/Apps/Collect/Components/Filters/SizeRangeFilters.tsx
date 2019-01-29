import { LabeledRange } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

export const SizeRangeFilters: React.SFC<{
  filters: FilterState
}> = ({ filters }) => {
  const [initialMinHeight, initialMaxHeight] = filters.rangeToTuple(
    "height_range"
  )
  const [initialMinWidth, initialMaxWidth] = filters.rangeToTuple("width_range")
  return (
    <ContextConsumer>
      {({ mediator }) => (
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
              filters.setFilter("height_range", `${minStr}-${maxStr}`, mediator)
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
              filters.setFilter("width_range", `${minStr}-${maxStr}`, mediator)
            }}
          />
        </>
      )}
    </ContextConsumer>
  )
}
