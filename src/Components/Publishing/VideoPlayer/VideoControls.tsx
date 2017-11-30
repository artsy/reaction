import React, { Component } from "react"
import styled from "styled-components"
import { Fonts } from "../Fonts"
import { IconVideoMute } from "../Icon/IconVideoMute"
import { IconVideoPause } from "../Icon/IconVideoPause"
import { IconVideoPlay } from "../Icon/IconVideoPlay"
import { IconVideoUnmute } from "../Icon/IconVideoUnmute"

interface Props extends React.HTMLProps<HTMLDivElement> {
  isMuted: boolean
  isPlaying: boolean
  title: string
  duration: number
  timeRemaining: number
  toggleFullscreen: () => void
  toggleMute: () => void
  togglePlay: () => void
}

export class VideoControls extends Component<Props, null> {
  formatTime = (time) => {
    let minutes = Math.floor(time / 60) % 60
    let seconds = Math.floor(time % 60)
    minutes = minutes <= 0 ? 0 : minutes
    seconds = seconds <= 0 ? 0 : seconds

    const minutesStr = minutes < 10 ? "0" + minutes : minutes
    const secondsStr = seconds < 10 ? "0" + seconds : seconds
    return minutesStr + ":" + secondsStr
  }

  render() {
    const {
      duration,
      isMuted,
      isPlaying,
      title,
      timeRemaining,
      toggleFullscreen,
      toggleMute,
      togglePlay
    } = this.props

    return (
      <VideoControlsContainer>
        <ControlBlock>
          <span onClick={togglePlay}>
            {isPlaying ?
              <IconVideoPause />
              :
              <IconVideoPlay />
            }
          </span>
          <Title>
            {title}
          </Title>
        </ControlBlock>
        <ControlBlock>
          <TimeRemaining>
            {this.formatTime(timeRemaining)}/{this.formatTime(duration)}
          </TimeRemaining>
          <span onClick={toggleMute}>
            {isMuted ?
              <IconVideoUnmute />
              :
              <IconVideoMute />
            }
          </span>
          <Fullscreen onClick={toggleFullscreen}>
            FS
          </Fullscreen>
        </ControlBlock>
      </VideoControlsContainer>
    )
  }
}

export const VideoControlsContainer = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  max-width: 1200px;
  border: 1px solid white;
  border-radius: 2px;
  position: absolute;
  bottom: 0px;
  padding: 20px;
  margin: 20px;
  opacity: 0;
  width: calc(100% - 40px);
  transition: opacity 0.25s ease;
`
const Title = styled.div`
  ${Fonts.garamond("s23")}
  margin-left: 20px;
`
const ControlBlock = styled.div`
  display: flex;
`
const Fullscreen = styled.span`
  cursor: pointer;
`
const TimeRemaining = styled.div`
  ${Fonts.garamond("s23")}
`
