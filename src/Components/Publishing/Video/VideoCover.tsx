import React, { Component } from "react"
import { Col } from 'react-styled-flexboxgrid'
import styled, { StyledFunction } from "styled-components"
import { media } from "../../Helpers"
import { Fonts } from "../Fonts"
import { IconVideoPlay } from "../Icon/IconVideoPlay"
import { MaxRow } from "./Shared"
import { VideoInfoBlock } from "./VideoInfoBlock"

interface Props {
  media?: any
  seriesTitle?: string
  description?: string
  playVideo?: () => void
  hideCover?: boolean
}

interface CoverProps {
  hideCover?: boolean
}

interface CoverAssetProps {
  src?: string
}

export class VideoCover extends Component<Props, null> {
  render() {
    const {
      description,
      media,
      seriesTitle,
      playVideo,
      hideCover
    } = this.props

    return (
      <VideoCoverContainer hideCover={hideCover}>
        <VideoCoverAsset src={media.cover_image_url} />
        <VideoCoverOverlay />
        <VideoCoverInfo>
          <VideoCoverInfoRow>
            <Col xs={2} sm={1} onClick={playVideo}>
              <IconVideoPlay color="white" />
            </Col>
            <Col xs={10} sm={3}>
              <VideoInfoBlock
                media={media}
                seriesTitle={seriesTitle}
              />
            </Col>
            <Col xs={12} sm={8}>
              <MediaDescription>
                {description}
              </MediaDescription>
            </Col>
          </VideoCoverInfoRow>
        </VideoCoverInfo>
      </VideoCoverContainer>
    )
  }
}

const Div: StyledFunction<CoverAssetProps> = styled.div
export const VideoCoverAsset = Div`
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  background-color: black;
`

const VideoCoverOverlay = styled.div`
  opacity: 0.75;
  background-color: black;
`

const VideoCoverInfoRow = styled(MaxRow)`
  align-items: flex-end;
`

const VideoCoverInfo = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 60px;
  z-index: 1;
  ${IconVideoPlay} {
    height: 60px;
    width: 44px;
    margin-right: 15px;
  }
  ${media.sm`
    padding-bottom: 40px;
  `}
`

const CoverDiv: StyledFunction<CoverProps> = styled.div
export const VideoCoverContainer = CoverDiv`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: white;
  opacity: ${props => props.hideCover ? '0' : '1'};
  visibility: ${props => props.hideCover ? 'hidden' : 'visible'};
  transition: opacity 0.5s ease visibility 0.5s ease;
  ${VideoCoverAsset}, ${VideoCoverOverlay}, ${VideoCoverInfo} {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const MediaDescription = styled.div`
  ${Fonts.garamond("s23")}
  ${media.sm`
    ${Fonts.garamond("s19")}
    margin-top: 30px;
  `}
`
