import React from "react"
import styled from "styled-components"
import { Fonts } from "../Fonts"

interface Props extends React.HTMLProps<HTMLDivElement> {
  duration: number
  currentTime: number
}

const formatTime = (time) => {
  let minutes = Math.floor(time / 60) % 60
  let seconds = Math.floor(time % 60)
  minutes = minutes <= 0 ? 0 : minutes
  seconds = seconds <= 0 ? 0 : seconds

  const minutesStr = minutes < 10 ? "0" + minutes : minutes
  const secondsStr = seconds < 10 ? "0" + seconds : seconds
  return minutesStr + ":" + secondsStr
}

const TimestampComponent: React.SFC<Props> = props => {
  const {
    className,
    currentTime,
    duration
  } = props

  return (
    <div
      className={className}
    >
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  )
}

export const Timestamp = styled(TimestampComponent)`
  ${Fonts.garamond("s23")}
`
