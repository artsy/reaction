import { FilterState } from "Apps/Collect/FilterState"
import React from "react"

import { Checkbox } from "@artsy/palette"
import { SystemProps } from "Artsy/SystemContext"

export const AttributionClassFilter: React.SFC<{
  filters: FilterState
  mediator: SystemProps["mediator"]
}> = ({ filters, mediator }) => (
  <>
    {Object.keys(AttributionClasses).map((attributionClass, index) => {
      const className = AttributionClasses[attributionClass].name
      const isSelected = filters.state.attribution_class.includes(
        attributionClass
      )

      return (
        <Checkbox
          selected={isSelected}
          onSelect={selected => {
            if (selected) {
              return filters.setFilter(
                "attribution_class",
                attributionClass,
                mediator
              )
            } else {
              return filters.unsetFilter("attribution_class", mediator)
            }
          }}
          key={index}
        >
          {className}
        </Checkbox>
      )
    })}
  </>
)

export const AttributionClasses = {
  unique: {
    id: "unique",
    name: "Unique",
  },
  "limited edition": {
    id: "limited edition",
    name: "Limited edition",
  },
  "made-to-order": {
    id: "made-to-order",
    name: "Made-to-order",
  },
  reproduction: {
    id: "reproduction",
    name: "Reproduction",
  },
  "editioned multiple": {
    id: "editioned multiple",
    name: "Editioned multiple",
  },
  "non-editioned multiple": {
    id: "non-editioned multiple",
    name: "Non-editioned multiple",
  },
  ephemera: {
    id: "ephemera",
    name: "Ephemera",
  },
}
