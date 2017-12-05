import React, { Component } from "react"
import styled from "styled-components"
import { Fonts } from "../Fonts"
import { IconVideoFullscreen } from "../Icon/IconVideoFullscreen"
import { MuteUnmute, MuteUnmuteContainer } from "./MuteUnmute"
import { PlayPause } from "./PlayPause"
import { Scrubber } from "./Scrubber"
import { Timestamp } from "./Timestamp"

interface Props extends React.HTMLProps<HTMLDivElement> {
  isMuted: boolean
  isPlaying: boolean
  title: string
  duration: number
  currentTime: number
  toggleFullscreen: () => void
  toggleMute: () => void
  togglePlay: () => void
  pause: () => void
  play: () => void
  seekTo: (v) => void
}

export class VideoControls extends Component<Props, null> {
  render() {
    const {
      isMuted,
      isPlaying,
      title,
      duration,
      currentTime,
      toggleFullscreen,
      toggleMute,
      togglePlay,
      pause,
      play,
      seekTo
    } = this.props

    return (
      <VideoControlsContainer>
        <TopControls>
          <Block>
            <PlayPause
              togglePlay={togglePlay}
              isPlaying={isPlaying}
            />
            <Title>
              {title}
            </Title>
          </Block>
          <Block>
            <Timestamp
              currentTime={currentTime}
              duration={duration}
            />
            <MuteUnmute
              toggleMute={toggleMute}
              isMuted={isMuted}
            />
            <IconVideoFullscreen
              onClick={toggleFullscreen}
            />
          </Block>
        </TopControls>
        <Scrubber
          duration={duration}
          currentTime={currentTime}
          pause={pause}
          play={play}
          seekTo={seekTo}
          isPlaying={isPlaying}
        />
      </VideoControlsContainer>
    )
  }
}

const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const VideoControlsContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  ${Timestamp} {
    margin-right: 30px;
  }
  ${MuteUnmuteContainer} {
    margin-right: 20px;
  }
`
const Title = styled.div`
  ${Fonts.garamond("s23")}
  margin-left: 20px;
`
const Block = styled.div`
  display: flex;
`
