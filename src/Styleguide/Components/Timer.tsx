import { Flex, Sans } from "@artsy/palette"
import { WithCurrentTime } from "Components/WithCurrentTime"
import moment from "moment-timezone"
import React from "react"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

export const Timer: React.SFC<{
  endDate: string
  labelWithTimeRemaining?: string
  labelWithoutTimeRemaining?: string
}> = ({ endDate, labelWithTimeRemaining, labelWithoutTimeRemaining }) => (
  <WithCurrentTime>
    {currentTime => {
      const duration = moment.duration(
        Math.max(moment(endDate).diff(moment(currentTime)), 0)
      )
      const hasEnded = Math.floor(duration.asSeconds())

      return (
        <Flex flexDirection="column" alignItems="center">
          <Sans size="4t" weight="medium">
            {padWithZero(duration.days())}d{"  "}
            {padWithZero(duration.hours())}h{"  "}
            {padWithZero(duration.minutes())}m{"  "}
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
