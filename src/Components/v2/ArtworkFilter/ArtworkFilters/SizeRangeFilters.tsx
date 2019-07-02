import { LabeledRange } from "@artsy/palette"
import React, { FC } from "react"
import { useFilterContext } from "../ArtworkFilterContext"

import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../Utils/rangeToTuple"

export const SizeRangeFilters: FC = () => {
  const filterContext = useFilterContext()

  const [initialMinHeight, initialMaxHeight] = filterContext.rangeToTuple(
    "height"
  )
  const [initialMinWidth, initialMaxWidth] = filterContext.rangeToTuple("width")

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
          filterContext.setFilter("height", `${minStr}-${maxStr}`)
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
          filterContext.setFilter("width", `${minStr}-${maxStr}`)
        }}
      />
    </>
  )
}
