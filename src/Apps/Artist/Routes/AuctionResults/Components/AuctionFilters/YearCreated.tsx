import { Flex, LargeSelect, Spacer, Toggle } from "@artsy/palette"
import { YearCreated_auctionResult } from "__generated__/YearCreated_auctionResult.graphql"
import React, { useMemo } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { DeFraged } from "Utils/typeSupport"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

interface YearCreatedProps {
  auctionResult: DeFraged<YearCreated_auctionResult>
}

const buildDateRange = (startYear: number, endYear: number) =>
  [...Array(1 + endYear - startYear).keys()].map(yearNum => {
    const year = `${yearNum + startYear}`
    return {
      text: year,
      value: year,
    }
  })

export const YearCreated: React.FC<YearCreatedProps> = ({ auctionResult }) => {
  // if (!auctionResult?.createdYearRange) {
  //   console.error(
  //     "Couldn't display year created filter due to lacking info from MP"
  //   )
  //   return null
  // }
  // TODO: Pull data from metaphysics
  const { startAt, endAt } = auctionResult.createdYearRange || {
    startAt: 1990,
    endAt: 2001,
  }
  const fullDateRange = useMemo(() => buildDateRange(startAt, endAt), [
    startAt,
    endAt,
  ])
  const filterContext = useAuctionResultsFilterContext()
  const [earliestCreated, latestCreated] = filterContext?.filters
    ?.createdYearRange || [
    fullDateRange[0].text,
    fullDateRange[fullDateRange.length - 1].text,
  ]

  return (
    <Toggle label="Year Created" expanded>
      <Flex>
        <LargeSelect
          title="Earliest"
          options={fullDateRange}
          onSelect={year => {
            if (year > latestCreated) {
              filterContext.setFilter("createdYearRange", [year, year])
            } else {
              filterContext.setFilter("createdYearRange", [year, latestCreated])
            }
          }}
          selected={`${earliestCreated}`}
        />
        <Spacer mr={1} />
        <LargeSelect
          title="Latest"
          options={fullDateRange}
          onSelect={year => {
            if (year < earliestCreated) {
              filterContext.setFilter("createdYearRange", [year, year])
            } else {
              filterContext.setFilter("createdYearRange", [
                earliestCreated,
                year,
              ])
            }
          }}
          selected={`${latestCreated}`}
        />
      </Flex>
    </Toggle>
  )
}

export const YearCreatedFragmentContainer = createFragmentContainer(
  YearCreated,
  {
    auctionResult: graphql`
      fragment YearCreated_auctionResult on AuctionResultConnection {
        createdYearRange {
          startAt
          endAt
        }
      }
    `,
  }
)
