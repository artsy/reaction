import { Radio, RadioGroup } from "@artsy/palette"
import { FilterState } from "Apps/Search/FilterState"
import React from "react"

interface Props {
  filters: FilterState
  timePeriods?: string[]
}

export class TimePeriodFilter extends React.Component<Props> {
  onClick(value) {
    const { filters } = this.props
    filters.setFilter("major_periods", value)
  }

  render() {
    const { timePeriods, filters } = this.props

    const periods = (timePeriods || allowedPeriods).filter(timePeriod =>
      allowedPeriods.includes(timePeriod)
    )

    const radioButtons = periods.map((timePeriod, index) => {
      return (
        <Radio my={0.3} value={timePeriod} key={index} label={timePeriod} />
      )
    })

    const selectedPeriod = filters.state.major_periods[0]

    return (
      <RadioGroup
        deselectable
        defaultValue={selectedPeriod && selectedPeriod[0]}
        onSelect={selectedOption => {
          this.onClick(selectedOption)
        }}
      >
        {radioButtons}
      </RadioGroup>
    )
  }
}

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
