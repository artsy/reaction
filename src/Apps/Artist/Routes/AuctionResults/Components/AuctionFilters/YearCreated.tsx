import { Flex, LargeSelect, Spacer, Toggle } from "@artsy/palette"
import React, { useMemo } from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

const buildDateRange = (startYear: number, endYear: number) =>
  [...Array(1 + endYear - startYear).keys()].map(yearNum => {
    const year = `${yearNum + startYear}`
    return {
      text: year,
      value: year,
    }
  })

export const YearCreated: React.FC = () => {
  const filterContext = useAuctionResultsFilterContext()
  const {
    earliestCreatedYear,
    latestCreatedYear,
    createdAfterYear,
    createdBeforeYear,
  } = filterContext?.filters
  if (
    typeof earliestCreatedYear === undefined ||
    typeof latestCreatedYear === undefined
  ) {
    console.error("Couldn't display year created filter due to missing data")
    return null
  }
  const fullDateRange = useMemo(
    () => buildDateRange(earliestCreatedYear, latestCreatedYear),
    [earliestCreatedYear, latestCreatedYear]
  )

  return (
    <Toggle label="Year Created" expanded>
      <Flex>
        <LargeSelect
          title="Earliest"
          options={fullDateRange}
          onSelect={year => {
            filterContext.setFilter("createdAfterYear", year)
          }}
          selected={`${createdAfterYear}`}
        />
        <Spacer mr={1} />
        <LargeSelect
          title="Latest"
          options={fullDateRange}
          onSelect={year => {
            filterContext.setFilter("createdBeforeYear", year)
          }}
          selected={`${createdBeforeYear}`}
        />
      </Flex>
    </Toggle>
  )
}
