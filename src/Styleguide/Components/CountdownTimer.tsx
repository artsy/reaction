import {
  color,
  Flex,
  Sans,
  space,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { WithCurrentTime } from "Components/WithCurrentTime"
import moment from "moment-timezone"
import React from "react"
import styled from "styled-components"
import { TimerIcon } from "Styleguide/Elements/icons/TimerIcon"

const FIVE_HOURS_IN_SECONDS = 60 * 60 * 5

const pad = (n: number) => n.toString().padStart(2, "0")

const TimeRemaining: React.SFC<{
  currentTime: string
  countdownEnd: string
  highlight: Parameters<typeof color>[0]
}> = ({ currentTime, countdownEnd, highlight = "purple100" }) => {
  const timeRemaining = moment.duration(
    moment(countdownEnd).diff(moment(currentTime))
  )
  return (
    <Sans size="3" color={highlight} weight="medium">
      {timeRemaining.asSeconds() <= 0 ? (
        "0 days"
      ) : (
        <>
          {timeRemaining.days() > 0 && pad(timeRemaining.days()) + "d "}
          {timeRemaining.hours() > 0 && pad(timeRemaining.hours()) + "h "}
          {timeRemaining.minutes() > 0 && pad(timeRemaining.minutes()) + "m "}
          {pad(timeRemaining.seconds()) + "s"}
        </>
      )}
      <span> left</span>
    </Sans>
  )
}

const ProgressBarBackground = styled.div`
  height: 3px;
  background-color: ${color("black10")};
  margin: ${space(0.5)}px 0 ${space(1)}px;
  display: flex;
  justify-content: flex-start;
`

const ProgressBar: React.SFC<{
  currentTime: string
  countdownStart: string
  countdownEnd: string
  highlight: Parameters<typeof color>[0]
}> = ({
  currentTime,
  countdownStart,
  countdownEnd,
  highlight = "purple100",
}) => {
  const secondsRemaining = moment(countdownEnd).diff(
    moment(currentTime),
    "seconds"
  )
  const secondsSinceStart = moment(currentTime).diff(
    moment(countdownStart),
    "seconds"
  )
  const progress = Math.max(
    0,
    (secondsRemaining * 100) / (secondsSinceStart + secondsRemaining)
  )
  return (
    <ProgressBarBackground>
      <div
        style={{
          backgroundColor: color(highlight),
          width: progress + "%",
        }}
      />
    </ProgressBarBackground>
  )
}

const StaticCountdownTimer: React.SFC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
  currentTime: string
}> = ({ action, note, countdownEnd, countdownStart, currentTime }) => {
  const actionDeadline = moment(countdownEnd)
    .tz(moment.tz.guess())
    .format("MMM DD, h:mm A z")

  const highlight =
    moment(countdownEnd).diff(moment(currentTime), "seconds") <
    FIVE_HOURS_IN_SECONDS
      ? "red100"
      : "purple100"

  return (
    <StackableBorderBox p={[2, 3]} flexDirection="column">
      <Flex justifyContent="flex-start">
        <TimerIcon
          width="14"
          height="17"
          fill={highlight}
          style={{ marginTop: "1.5px" }}
        />
        <Spacer mr="7px" />
        <TimeRemaining
          countdownEnd={countdownEnd}
          currentTime={currentTime}
          highlight={highlight}
        />
      </Flex>
      <ProgressBar
        countdownStart={countdownStart}
        countdownEnd={countdownEnd}
        currentTime={currentTime}
        highlight={highlight}
      />
      <Sans size="2" weight="medium" color="black100">
        {action} by {actionDeadline}
      </Sans>
      <Sans size="2" color="black60">
        {note}
      </Sans>
    </StackableBorderBox>
  )
}

export const CountdownTimer: React.SFC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
}> = props => (
  <WithCurrentTime>
    {currentTime => (
      <StaticCountdownTimer currentTime={currentTime} {...props} />
    )}
  </WithCurrentTime>
)
