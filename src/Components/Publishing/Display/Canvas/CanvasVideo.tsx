import { once } from "lodash"
import React from "react"
import styled from "styled-components"
import track from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { VideoControls } from '../../Sections/VideoControls'

interface VideoProps {
  campaign: any
  src: any
  onInit?: any
}

@track()
export class CanvasVideo extends React.Component<VideoProps, any> {
  private video: HTMLVideoElement

  constructor(props) {
    super(props)
    this.onPlayVideo = this.onPlayVideo.bind(this)

    this.state = {
      isPlaying: false
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
        toggleVideo: this.toggleVideo
      })
    }
  }

  @track(once((props) => ({
    action: "Click",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "canvas_standard"
  })))
  onPlayVideo() {
    this.toggleVideo()
  }

  playVideo = () => {
    if (this.video) {
      this.video.play()

      this.setState({
        isPlaying: true
      })
    }
  }

  pauseVideo = () => {
    if (this.video) {
      this.video.pause()

      this.setState({
        isPlaying: false
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

  renderCover = () => {
    if (!this.state.isPlaying) {
      return (
        <Cover>
          <VideoControls />
        </Cover>
      )
    }
  }

  render() {
    return (
      <VideoContainer onClick={this.onPlayVideo}>
        {this.renderCover()}

        <video playsInline
          src={this.props.src}
          className='CanvasVideo__video'
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
  `}
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
