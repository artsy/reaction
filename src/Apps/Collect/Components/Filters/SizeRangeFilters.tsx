import { LabeledRange } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

export const SizeRangeFilters: React.SFC<{
  filters: FilterState
}> = ({ filters }) => {
  const [initialMinHeight, initialMaxHeight] = filters.heightRangeToTuple()
  const [initialMinWidth, initialMaxWidth] = filters.widthRangeToTuple()
  return (
    <ContextConsumer>
      {({ mediator }) => (
        <>
          <LabeledRange
            label="Height"
            allowCross={false}
            min={FilterState.MIN_HEIGHT}
            max={FilterState.MAX_HEIGHT}
            step={1}
            defaultValue={[initialMinHeight, initialMaxHeight]}
            // I can't think of a scenario in which we'd disable this...maybe
            // if we had no height info on the works displayed?
            // disabled={filters.state.at_auction}
            onAfterChange={([min, max]) => {
              const minStr = min === FilterState.MIN_HEIGHT ? "*" : min
              const maxStr = max === FilterState.MAX_HEIGHT ? "*" : max

              // I think this is what actually sets the range of heights to show
              filters.setFilter("height_range", `${minStr}-${maxStr}`, mediator)
            }}
          />
          <LabeledRange
            label="Width"
            allowCross={false}
            min={FilterState.MIN_WIDTH}
            max={FilterState.MAX_WIDTH}
            step={1}
            defaultValue={[initialMinWidth, initialMaxWidth]}
            // I can't think of a scenario in which we'd disable this...maybe
            // if we had no width info on the works displayed?
            // disabled={filters.state.at_auction}
            onAfterChange={([min, max]) => {
              const minStr = min === FilterState.MIN_WIDTH ? "*" : min
              const maxStr = max === FilterState.MAX_WIDTH ? "*" : max

              // I think this is what actually sets the range of widths to show
              filters.setFilter("width_range", `${minStr}-${maxStr}`, mediator)
            }}
          />
        </>
      )}
    </ContextConsumer>
  )
}
