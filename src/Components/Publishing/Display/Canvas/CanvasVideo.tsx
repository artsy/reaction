import React from "react"
import styled from "styled-components"
import track from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"

interface VideoProps {
  campaign: any
  src: any
}

@track()
export class CanvasVideo extends React.Component<VideoProps, any> {
  private video: HTMLVideoElement

  constructor(props) {
    super(props)
    this.onPlayVideo = this.onPlayVideo.bind(this)
    this.state = { isPlaying: false }
  }

  @track(props => ({
    action: "Click",
    label: "Display ad play video",
    entity_type: "display_ad",
    campaign_name: props.campaign.name,
    unit_layout: "canvas_standard"
  }))
  onPlayVideo() {
    if (this.video) {
      if (this.video.paused) {
        this.video.play()
      } else {
        this.video.pause()
      }
    }
    this.setState({ isPlaying: !this.video.paused })
  }

  renderCover = () => {
    if (!this.state.isPlaying) {
      return (
        <Cover>
          <PlayButton>
            <PlayButtonCaret />
          </PlayButton>
        </Cover>
      )
    }
  }

  render() {
    return (
      <VideoContainer onClick={this.onPlayVideo}>
        {this.renderCover()}
        <video src={this.props.src} controls={false} playsInline ref={video => (this.video = video)} />
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
const PlayButtonCaret = styled.div`
  color: black;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 30px solid black;
`

const PlayButton = styled.div`
  background: white;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  border: 0;
  outline: 0;
`
