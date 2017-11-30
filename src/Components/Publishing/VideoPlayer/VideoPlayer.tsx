import React, { Component } from "react"
import styled from "styled-components"
import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen
} from "./Fullscreen"
import { VideoControls, VideoControlsContainer } from "./VideoControls"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string,
  title?: string
  duration?: number
}

interface State {
  isMuted: boolean,
  isPlaying: boolean,
  timeRemaining: number
}

export class VideoPlayer extends Component<Props, State> {
  public video: HTMLVideoElement
  public videoPlayer: HTMLDivElement

  state = {
    isMuted: false,
    isPlaying: false,
    timeRemaining: this.props.duration
  }

  componentDidMount() {
    if (fullscreenEnabled()){
      addFSEventListener(this.video)
    }
    this.video.addEventListener("timeupdate", this.updateTime)
  }

  componentWillUnmount() {
    if (fullscreenEnabled()) {
      removeFSEventListener(this.video)
    }
    this.video.removeEventListener("timeupdate", this.updateTime)
  }

  updateTime = (e) => {
    console.log(this.props.duration)
    console.log('herererere')
    console.log(e.currentTime)
    this.setState({
      timeRemaining: this.props.duration - e.currentTime
    })
  }

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.video.pause()
    } else {
      this.video.play()
    }

    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  toggleMute = () => {
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
    const {
      duration,
      url,
      title
    } = this.props

    return (
      <VideoContainer
        ref={container => (this.videoPlayer = container)}
      >
        <video playsInline
          src={url}
          ref={video => (this.video = video)}
          muted={this.state.isMuted}
        />
        <VideoControls
          title={title}
          duration={duration}
          timeRemaining={this.state.timeRemaining}
          toggleFullscreen={this.toggleFullscreen}
          toggleMute={this.toggleMute}
          togglePlay={this.togglePlay}
          isMuted={this.state.isMuted}
          isPlaying={this.state.isPlaying}
        />
      </VideoContainer>
    )
  }
}

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
  ${VideoControlsContainer} {
    opacity: 1;
  }
  &:hover {
    // TODO UNTOGGLE ME
    // ${VideoControlsContainer} {
    //   opacity: 1;
    // }
  }
`
