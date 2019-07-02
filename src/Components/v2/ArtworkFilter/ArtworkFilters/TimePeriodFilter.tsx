import { Radio, RadioGroup } from "@artsy/palette"
import React, { FC } from "react"
import { useFilterContext } from "../ArtworkFilterContext"

interface Props {
  timePeriods?: string[]
}

export const TimePeriodFilter: FC<Props> = props => {
  const filterContext = useFilterContext()

  const periods = (props.timePeriods || allowedPeriods).filter(timePeriod => {
    return allowedPeriods.includes(timePeriod)
  })

  const selectedPeriod = filterContext.filters.major_periods[0]

  return (
    <RadioGroup
      deselectable
      defaultValue={selectedPeriod}
      onSelect={selectedOption => {
        filterContext.setFilter("major_periods", selectedOption)
      }}
    >
      {periods.map((timePeriod, index) => {
        return (
          <Radio my={0.3} value={timePeriod} key={index} label={timePeriod} />
        )
      })}
    </RadioGroup>
  )
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
