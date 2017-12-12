import React, { Component } from "react"
import { Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { formatTime } from "../Constants"
import { Fonts } from "../Fonts"

interface Props {
  media?: any
  seriesTitle?: string
}

export class VideoInfoBlock extends Component<Props, null> {
  render() {
    const {
      media,
      seriesTitle,
    } = this.props
    return (
      <div>
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
      </div>
    )
  }
}

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
