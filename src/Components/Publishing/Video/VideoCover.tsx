import React, { Component } from "react"
import { Col, Row } from 'react-styled-flexboxgrid'
import styled, { StyledFunction } from "styled-components"
import { formatTime } from "../Constants"
import { Fonts } from "../Fonts"
import { IconVideoPlay } from "../Icon/IconVideoPlay"

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
          <Col xs={1} onClick={playVideo}>
            <IconVideoPlay color="white" />
          </Col>
          <Col xs={3}>
            <InfoBlock>
              <Row>
                {seriesTitle &&
                  <SeriesTitle>
                    {seriesTitle}
                  </SeriesTitle>
                }
                <MediaDuration>
                  {formatTime(media.duration)}
                </MediaDuration>
              </Row>
              <Row>
                <MediaTitle>
                  {media.title}
                </MediaTitle>
              </Row>
            </InfoBlock>
          </Col>
          <Col
            xs={8}
          >
            <MediaDescription>
              {description}
            </MediaDescription>
          </Col>
        </VideoCoverInfo>
      </VideoCoverContainer>
    )
  }
}

const Div: StyledFunction<CoverAssetProps> = styled.div
export const VideoCoverAsset = Div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  background-color: black;
`
const VideoCoverOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: black;
  top: 0;
`
const CoverDiv: StyledFunction<CoverProps> = styled.div
export const VideoCoverContainer = CoverDiv`
  width: 100vw;
  height: 100vh;
  display: flex;
  opacity: ${props => props.hideCover ? '0' : '1'};
  visibility: ${props => props.hideCover ? 'hidden' : 'visible'};
  position: relative;
  transition: all 0.5s ease;
`
const VideoCoverInfo = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: 1;
  max-width: 1200px;
  color: white;
  margin: auto auto 60px auto;
  ${IconVideoPlay} {
    height: 60px;
    width: 44px;
    margin-right: 30px;
  }
`
const InfoBlock = styled.div`
  display: block;
`
const SeriesTitle = styled.span`
  ${Fonts.unica("s16")}
  margin-right: 35px;
`
const MediaTitle = styled.span`
  ${Fonts.unica("s45")}
`
const MediaDuration = styled.span`
  ${Fonts.unica("s16")}
`
const MediaDescription = styled.div`
  ${Fonts.garamond("s23")}
`
