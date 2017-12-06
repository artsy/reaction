import React, { Component } from "react"
import styled from "styled-components"
// import { pMedia } from "../../Helpers"
// import { Fonts } from "../Fonts"
// import { PartnerBlock, PartnerBlockContainer } from '../Partner/PartnerBlock'
import VideoPlayer from "../VideoPlayer/VideoPlayer"

interface Props {
  article?: any
}

export class VideoLayout extends Component<Props, null> {
  // public static defaultProps: Partial<Props>

  render() {
    const { article } = this.props
    const { media } = article
    return(
      <VideoLayoutContainer>
        <VideoPlayer
          url={media.url}
          title={media.title}
        />
      </VideoLayoutContainer>
    )
  }
}

const VideoLayoutContainer = styled.div`

`
