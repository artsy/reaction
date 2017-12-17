import React, { Component } from "react"
import { Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { formatTime } from "../Constants"
import { Fonts } from "../Fonts"

interface Props {
  editTitle?: any
  media?: any
  subTitle?: string
  title?: string
}

export class VideoInfoBlock extends Component<Props, null> {
  render() {
    const {
      editTitle,
      media,
      subTitle,
      title
    } = this.props

    return (
      <div>
        <Row>
          {subTitle &&
            <SubTitle>
              {subTitle}
            </SubTitle>
          }
          <MediaDuration>
            {formatTime(media.duration || 0)}
          </MediaDuration>
        </Row>
        <Row>
          <MediaTitle>
            {editTitle || title}
          </MediaTitle>
        </Row>
      </div>
    )
  }
}

const SubTitle = styled.span`
  ${Fonts.unica("s16")}
  margin-right: 35px;
`

const MediaTitle = styled.span`
  position: relative;
  ${Fonts.unica("s45")}
`

const MediaDuration = styled.span`
  ${Fonts.unica("s16")}
`
