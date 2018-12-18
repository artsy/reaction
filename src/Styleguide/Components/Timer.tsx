import { Flex, Sans } from "@artsy/palette"
import { WithCurrentTime } from "Components/WithCurrentTime"
import moment from "moment-timezone"
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
      const duration = moment.duration(
        Math.max(moment(endDate).diff(moment(currentTime)), 0)
      )
      const hasEnded = Math.floor(duration.asSeconds()) <= 0

      return (
        <Flex flexDirection="column" alignItems="center">
          <Sans size="4t" weight="medium">
            {padWithZero(duration.days())}d{SEPARATOR}
            {padWithZero(duration.hours())}h{SEPARATOR}
            {padWithZero(duration.minutes())}m{SEPARATOR}
            {padWithZero(duration.seconds())}s
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
