import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

import { Radio } from "@artsy/palette"

export const TimePeriodFilter: React.SFC<{
  filters: FilterState
}> = ({ filters }) => (
  <ContextConsumer>
    {({ mediator }) =>
      allowedPeriods.map((timePeriod, index) => {
        const isSelected = filters.state.major_periods[0] === timePeriod

        return (
          <Radio
            my={0.3}
            selected={isSelected}
            value={timePeriod}
            onSelect={({ selected }) => {
              if (selected) {
                return filters.setFilter("major_periods", timePeriod, mediator)
              } else {
                return filters.unsetFilter("major_periods", mediator)
              }
            }}
            key={index}
          >
            {timePeriod}
          </Radio>
        )
      })
    }
  </ContextConsumer>
)

const allowedPeriods = [
  "2010",
  "2000",
  "1990",
  "1980",
  "1970",
  "1960",
  "1950",
  "1940",
  "1930",
  "1920",
  "1910",
  "1900",
  "Late 19th Century",
  "Mid 19th Century",
  "Early 19th Century",
]
