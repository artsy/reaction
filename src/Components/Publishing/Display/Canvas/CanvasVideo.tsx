import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"

interface VideoProps {
  src: any
}

class DisplayCanvasVideo extends React.Component<VideoProps, any> {
  constructor(props) {
    super(props)
    this.state = { isPlaying: false }
  }

  onPlayVideo = e => {
    e.preventDefault()
    e.target.paused ? e.target.play() : e.target.pause()
    this.setState({ isPlaying: !e.target.paused })
  }

  renderCover = () => {
    if (!this.state.isPlaying) {
      return (
        <Cover>
          <PlayButton><PlayButtonCaret /></PlayButton>
        </Cover>
      )
    }
  }

  render() {
    return (
      <VideoContainer onClick={this.onPlayVideo}>
        {this.renderCover()}
        <Video src={this.props.src} controls={false} playsInline />
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
  ${pMedia.sm`
    width: 100%;
    height: auto;
    overflow: visible;
  `}
`
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${pMedia.sm`
    height: auto;
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

export default DisplayCanvasVideo
