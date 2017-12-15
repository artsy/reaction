import { memoize } from "lodash"
import React, { Component } from "react"
import styled from "styled-components"
import { track } from "../../../../Utils/track"
import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen
} from "./FullscreenHelpers"
import { VideoControls, VideoControlsContainer } from "./VideoControls"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string,
  title?: string,
  notifyIsPaused?: () => void,
  forcePlay?: boolean
  tracking?: any
}

interface State {
  isMuted: boolean,
  isPlaying: boolean,
  currentTime: number,
  duration: number
}

@track()
export class VideoPlayer extends Component<Props, State> {
  public video: HTMLVideoElement
  public videoPlayer: HTMLDivElement

  state = {
    isMuted: false,
    isPlaying: this.props.forcePlay,
    currentTime: 0,
    duration: 0
  }

  constructor(props) {
    super(props)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }

  componentDidMount() {
    if (this.video) {
      if (fullscreenEnabled()){
        addFSEventListener(this.video)
      }
      this.video.addEventListener("timeupdate", this.updateTime)
      this.video.addEventListener("loadedmetadata", this.setDuration)
    }
  }

  componentWillUnmount() {
    if (fullscreenEnabled()) {
      removeFSEventListener(this.video)
    }
    this.video.removeEventListener("timeupdate", this.updateTime)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.forcePlay){
      this.forcePlay()
    }
  }

  setDuration = (e) => {
    this.setState({
      duration: e.target.duration
    })
  }

  updateTime = (e) => {
    this.trackProgress()
    this.setState({
      currentTime: e.target.currentTime
    })
  }

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.video.pause()
      if (this.props.notifyIsPaused) {
        this.props.notifyIsPaused()
      }
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

  forcePlay = () => {
    this.video.play()
    this.setState({
      isPlaying: true
    })
  }

  @track({
    action: "Clicked fullscreen"
  })
  toggleFullscreen() {
    if (fullscreenEnabled()) {
      if (isFullscreen()) {
        exitFullscreen()
      } else {
        requestFullscreen(this.videoPlayer)
      }
    }
  }

  seekTo = (value) => {
    this.video.currentTime = value
    this.setState({
      currentTime: value
    })
  }

  pause = () => {
    this.video.pause()
    this.setState({
      isPlaying: false
    })
  }

  play = () => {
    this.video.play()
    this.setState({
      isPlaying: true
    })
  }

  trackProgress = () => {
    const secondsComplete = Math.floor(this.video.currentTime)
    const percentComplete = Math.floor(this.video.currentTime / this.video.duration * 100)
    const percentCompleteInterval = Math.floor(percentComplete / 25) * 25

    // Track 25% duration intervals
    if (percentCompleteInterval > 0) {
      this.trackDuration(percentCompleteInterval)
    }

    // Track 3 & 10 seconds
    if (secondsComplete === 3 || secondsComplete === 10) {
      this.trackSeconds(secondsComplete)
    }
  }

  trackDuration = memoize((percentComplete) => {
    this.props.tracking.trackEvent({
      action: "Video duration",
      label: "Video duration",
      percent_complete: percentComplete,
    })
  })

  trackSeconds = memoize((secondsComplete) => {
    this.props.tracking.trackEvent({
      action: "Video seconds",
      label: "Video seconds",
      seconds_complete: secondsComplete,
    })
  })

  render() {
    const {
      url,
      title
    } = this.props

    return (
      <VideoContainer
        innerRef={container => (this.videoPlayer = container)}
      >
        <video playsInline
          src={url}
          ref={video => (this.video = video)}
          muted={this.state.isMuted}
        />
        <VideoControlsParent>
          <VideoControls
            title={title}
            duration={this.state.duration}
            currentTime={this.state.currentTime}
            toggleFullscreen={this.toggleFullscreen}
            toggleMute={this.toggleMute}
            togglePlay={this.togglePlay}
            pause={this.pause}
            play={this.play}
            seekTo={this.seekTo}
            isMuted={this.state.isMuted}
            isPlaying={this.state.isPlaying}
          />
        </VideoControlsParent>
      </VideoContainer>
    )
  }
}

const VideoControlsParent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`
export const VideoContainer = styled.div`
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
    opacity: 0;
  }
  &:hover {
    ${VideoControlsContainer} {
      opacity: 1;
    }
  }
`
