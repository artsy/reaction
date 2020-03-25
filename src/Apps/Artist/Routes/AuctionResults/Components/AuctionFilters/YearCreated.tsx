import { Flex, LargeSelect, Spacer, Toggle } from "@artsy/palette"
import { FilterResetLink } from "Components/FilterResetLink"
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
    typeof earliestCreatedYear !== "number" ||
    typeof latestCreatedYear !== "number"
  ) {
    console.error("Couldn't display year created filter due to missing data")
    return null
  }
  const hasChanges =
    earliestCreatedYear !== createdAfterYear ||
    latestCreatedYear !== createdBeforeYear
  const fullDateRange = useMemo(
    () => buildDateRange(earliestCreatedYear, latestCreatedYear),
    [earliestCreatedYear, latestCreatedYear]
  )
  const resetFilter = useMemo(
    () => () => {
      filterContext.setFilter("createdAfterYear", earliestCreatedYear)
      filterContext.setFilter("createdBeforeYear", latestCreatedYear)
    },
    [earliestCreatedYear, latestCreatedYear]
  )

  return (
    <Toggle
      label="Year Created"
      expanded
      renderSecondaryAction={() => (
        <FilterResetLink onReset={resetFilter} hasChanges={hasChanges} />
      )}
    >
      <Flex>
        <LargeSelect
          title="Earliest"
          options={fullDateRange}
          onSelect={(year: string) => {
            filterContext.setFilter("createdAfterYear", parseInt(year))
          }}
          selected={`${createdAfterYear}`}
        />
        <Spacer mr={1} />
        <LargeSelect
          title="Latest"
          options={fullDateRange}
          onSelect={(year: string) => {
            filterContext.setFilter("createdBeforeYear", parseInt(year))
          }}
          selected={`${createdBeforeYear}`}
        />
      </Flex>
    </Toggle>
  )
}
