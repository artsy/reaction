import { Radio, RadioGroup } from "@artsy/palette"
import { FilterContextValues } from "Apps/Search/FilterContext"
import React from "react"

interface Props {
  filterContext: FilterContextValues
  timePeriods?: string[]
}

export class TimePeriodFilter extends React.Component<Props> {
  onClick(value) {
    const { filterContext } = this.props
    filterContext.setFilter("major_periods", value)
  }

  render() {
    const { timePeriods, filterContext } = this.props

    const periods = (timePeriods || allowedPeriods).filter(timePeriod =>
      allowedPeriods.includes(timePeriod)
    )

    const radioButtons = periods.map((timePeriod, index) => {
      return (
        <Radio my={0.3} value={timePeriod} key={index} label={timePeriod} />
      )
    })

    const selectedPeriod = filterContext.filters.major_periods[0]

    return (
      <RadioGroup
        deselectable
        defaultValue={selectedPeriod}
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
