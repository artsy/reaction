import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

import { Radio } from "@artsy/palette"

export const MediumFilter: React.SFC<{
  filters: FilterState
  mediums: Array<{
    id: string
    name: string
  }>
}> = ({ filters, mediums }) => (
  <ContextConsumer>
    {({ mediator }) =>
      mediums.map((medium, index) => {
        const isSelected = filters.state.medium === medium.id

        return (
          <Radio
            my={0.3}
            selected={isSelected}
            value={medium.id}
            onSelect={({ selected }) => {
              if (selected) {
                return filters.setFilter("medium", medium.id, mediator)
              } else {
                return filters.unsetFilter("medium", mediator)
              }
            }}
            key={index}
          >
            {medium.name}
          </Radio>
        )
      })
    }
  </ContextConsumer>
)
