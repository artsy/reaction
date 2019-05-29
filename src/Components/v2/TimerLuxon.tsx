import { Flex, Sans } from "@artsy/palette"
import { WithCurrentTime } from "Components/WithCurrentTime"
import { DateTime } from "luxon"
// import moment from "moment-timezone"
import Duration from "luxon/src/duration.js"
import React from "react"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.SFC<{
  endDate: string
  labelWithTimeRemaining?: string
  labelWithoutTimeRemaining?: string
}> = ({ endDate, labelWithTimeRemaining, labelWithoutTimeRemaining }) => (
  <WithCurrentTime syncWithServer>
    {currentTime => {
      const duration = Duration.fromMillis(
        DateTime.fromISO(endDate).diff(DateTime.fromISO(currentTime))
      )

      const hasEnded = Math.floor(duration.seconds) <= 0

      return (
        <Flex flexDirection="column" alignItems="center">
          <Sans size="4t" weight="medium">
            {padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("hours") % 24)))}h
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("minutes") % 60)))}m
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("seconds") % 60)))}s
          </Sans>
          {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
            <Sans size="3" weight="medium">
              {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
            </Sans>
          )}
        </Flex>
      )
    }}
  </WithCurrentTime>
)
