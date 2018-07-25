import { memoize, once } from "lodash"
import React, { Component } from "react"
import track from "react-tracking"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../Helpers"
import { VideoControls } from "../../Sections/VideoControls"

export interface CanvasVideoProps {
  campaign: any
  coverUrl?: string
  src: any
  onInit?: any
  tracking?: any
}

@track()
export class CanvasVideo extends Component<CanvasVideoProps, any> {
  public video: HTMLVideoElement

  static defaultProps = {
    coverUrl: "",
  }

  constructor(props) {
    super(props)
    this.onPlayVideo = this.onPlayVideo.bind(this)

    this.state = {
      isPlaying: false,
    }
  }

  componentDidMount() {
    const { onInit } = this.props

    if (onInit) {
      // Pass handlers back to CanvasContainer so that it can pause video
      // when Display is clicked.
      onInit({
        playVideo: this.playVideo,
        pauseVideo: this.pauseVideo,
        toggleVideo: this.toggleVideo,
      })
    }
  }

  componentWillUpdate() {
    this.video.removeEventListener("timeupdate", this.trackProgress)
  }

  componentDidUpdate() {
    this.video.addEventListener("timeupdate", this.trackProgress)
  }

  trackProgress = () => {
    const secondsComplete = Math.floor(this.video.currentTime)
    const percentComplete = Math.floor(
      (this.video.currentTime / this.video.duration) * 100
    )
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

  trackDuration: Function = memoize(percentComplete => {
    this.props.tracking.trackEvent({
      action: "Video duration",
      label: "Display ad video duration",
      percent_complete: percentComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "canvas_standard",
    })
  })

  trackSeconds: Function = memoize(secondsComplete => {
    this.props.tracking.trackEvent({
      action: "Video seconds",
      label: "Display ad video seconds",
      seconds_complete: secondsComplete,
      campaign_name: this.props.campaign.name,
      unit_layout: "canvas_standard",
    })
  })

  @track(
    once(props => ({
      action: "Click",
      label: "Display ad play video",
      entity_type: "display_ad",
      campaign_name: props.campaign.name,
      unit_layout: "canvas_standard",
    }))
  )
  onPlayVideo() {
    this.toggleVideo()
  }

  playVideo = () => {
    if (this.video) {
      this.video.play()

      this.setState({
        isPlaying: true,
      })
    }
  }

  pauseVideo = () => {
    if (this.video) {
      this.video.pause()

      this.setState({
        isPlaying: false,
      })
    }
  }

  toggleVideo = () => {
    if (this.state.isPlaying) {
      this.pauseVideo()
    } else {
      this.playVideo()
    }
  }

  render() {
    const { isPlaying } = this.state

    return (
      <VideoContainer onClick={this.onPlayVideo}>
        {!isPlaying && (
          <Cover coverUrl={this.props.coverUrl}>
            <VideoControls />
          </Cover>
        )}

        <video
          playsInline
          src={this.props.src}
          className="CanvasVideo__video"
          controls={false}
          ref={video => (this.video = video)}
        />
      </VideoContainer>
    )
  }
}

const VideoContainer = styled.div`
  width: 65%;
  max-width: 760px;
  height: 100%;
  overflow: hidden;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${pMedia.sm`
    width: 100%;
    height: auto;
    overflow: visible;
    video {
      height: auto;
    }
  `};
`

const div: StyledFunction<{
  coverUrl?: string
}> =
  styled.div

const Cover = div`
  background: url(${p => p.coverUrl || ""}) no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
