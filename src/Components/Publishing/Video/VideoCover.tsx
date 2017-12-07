import React, { Component } from "react"
import { Col, Row } from 'react-styled-flexboxgrid'
import styled, { StyledFunction } from "styled-components"
import { formatTime } from "../Constants"
import { IconVideoPlay } from "../Icon/IconVideoPlay"

interface Props {
  media?: any
  seriesTitle?: string
  description?: string
}

interface CoverProps {
  src?: string
}

export class VideoCover extends Component<Props, null> {
  render() {
    const {
      description,
      media,
      seriesTitle
    } = this.props
    return (
      <VideoCoverContainer src={media.cover_image_url}>
        <Row>
          <Col>
            <IconVideoPlay color="white" />
            <VideoInfo>
              <div>
                {seriesTitle}
                {formatTime(media.duration)}
              </div>
              {media.title}
            </VideoInfo>
          </Col>
          <Col>
            {description}
          </Col>
        </Row>
      </VideoCoverContainer>
    )
  }
}

const Div: StyledFunction<CoverProps> = styled.div
const VideoCoverContainer = Div`
  display: flex;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  background-color: black;
  width: 100%;
  height: 100%;
  color: white;
`
const VideoInfo = styled.div`
  display: block;
`
