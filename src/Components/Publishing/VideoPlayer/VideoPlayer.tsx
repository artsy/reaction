import React, { Component } from "react"
import styled from "styled-components"
import { Fonts } from "../Fonts"
import { IconVideoMute } from "../Icon/IconVideoMute"
import { IconVideoPause } from "../Icon/IconVideoPause"
import { IconVideoPlay } from "../Icon/IconVideoPlay"
import { IconVideoUnmute } from "../Icon/IconVideoUnmute"
import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen
} from "./Fullscreen"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string,
  title?: string
}

interface State {
  isMuted: boolean,
  isPlaying: boolean
}

export class VideoPlayer extends Component<Props, State> {
  public video: HTMLVideoElement
  public videoPlayer: HTMLDivElement

  state = {
    isMuted: false,
    isPlaying: false
  }

  componentDidMount = () => {
    if (fullscreenEnabled()){
      addFSEventListener(this.video)
    }
  }

  componentWillUnmount = () => {
    if (fullscreenEnabled()) {
      removeFSEventListener(this.video)
    }
  }

  togglePlayButton = () => {
    if (this.state.isPlaying) {
      this.video.pause()
    } else {
      this.video.play()
    }

    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  toggleMuteButton = (e) => {
    this.setState({
      isMuted: !this.state.isMuted
    })
  }

  toggleFullscreen = () => {
    if (fullscreenEnabled()) {
      if (isFullscreen()) {
        exitFullscreen()
      } else {
        requestFullscreen(this.videoPlayer)
      }
    }
  }

  render() {
    const { url, title } = this.props

    return (
      <VideoContainer
        ref={container => (this.videoPlayer = container)}
      >
        <video playsInline
          src={url}
          ref={video => (this.video = video)}
          muted={this.state.isMuted}
        />
        <VideoControls>
          <ControlBlock>
            <span onClick={this.togglePlayButton}>
              {
                this.state.isPlaying
                ?
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
          <span onClick={this.toggleMuteButton}>
            {
              this.state.isMuted
              ?
              <IconVideoUnmute />
              :
              <IconVideoMute />
            }
          </span>
          <Fullscreen onClick={this.toggleFullscreen}>
            FS
          </Fullscreen>
          </ControlBlock>
        </VideoControls>
      </VideoContainer>
    )
  }
}

const VideoControls = styled.div`
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
const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
  video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${VideoControls} {
      opacity: 1;
    }
  }
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
