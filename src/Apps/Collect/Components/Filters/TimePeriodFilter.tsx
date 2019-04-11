import { SystemContextConsumer } from "Artsy"
import React from "react"
import { FilterState } from "../../FilterState"

import { Radio, RadioGroup } from "@artsy/palette"

export const TimePeriodFilter: React.SFC<{
  filters: FilterState
  timePeriods?: string[]
}> = ({ filters, timePeriods }) => (
  <SystemContextConsumer>
    {({ mediator }) => {
      const periods = (timePeriods || allowedPeriods).filter(timePeriod =>
        allowedPeriods.includes(timePeriod)
      )

      const radioButtons = periods.map((timePeriod, index) => {
        const isSelected = filters.state.major_periods[0] === timePeriod

        return (
          <Radio
            my={0.3}
            selected={isSelected}
            value={timePeriod}
            key={index}
            label={timePeriod}
          />
        )
      })
      return (
        <RadioGroup
          deselectable
          onSelect={selectedOption => {
            filters.setFilter("major_periods", selectedOption, mediator)
          }}
        >
          {radioButtons}
        </RadioGroup>
      )
    }}
  </SystemContextConsumer>
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
