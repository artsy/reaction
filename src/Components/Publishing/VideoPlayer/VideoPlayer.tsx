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
}

interface State {
  isMuted: boolean,
  isPlaying: boolean,
  currentTime: number,
  duration: number
}

export class VideoPlayer extends Component<Props, State> {
  public video: HTMLVideoElement
  public videoPlayer: HTMLDivElement

  state = {
    isMuted: false,
    isPlaying: false,
    currentTime: 0,
    duration: 0
  }

  componentDidMount() {
    if (fullscreenEnabled()){
      addFSEventListener(this.video)
    }
    this.video.addEventListener("timeupdate", this.updateTime)
    this.video.addEventListener("loadedmetadata", this.setDuration)
  }

  componentWillUnmount() {
    if (fullscreenEnabled()) {
      removeFSEventListener(this.video)
    }
    this.video.removeEventListener("timeupdate", this.updateTime)
  }

  setDuration = (e) => {
    this.setState({
      duration: e.target.duration
    })
  }

  updateTime = (e) => {
    this.setState({
      currentTime: e.target.currentTime
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
          duration={this.state.duration}
          currentTime={this.state.currentTime}
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
