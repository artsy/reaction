import React, { Component } from "react"
import { Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { formatTime } from "../Constants"
import { Fonts } from "../Fonts"

interface Props {
  editTitle?: any
  media?: any
  tag?: string
  title?: string
}

export class VideoInfoBlock extends Component<Props, null> {
  render() {
    const {
      editTitle,
      media,
      tag,
      title
    } = this.props

    return (
      <div>
        <Row>
          {tag &&
            <TagTitle>
              {tag}
            </TagTitle>
          }
          <MediaDuration>
            {formatTime(media.duration)}
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

const TagTitle = styled.span`
  ${Fonts.unica("s16")}
  margin-right: 35px;
`

const MediaTitle = styled.span`
  ${Fonts.unica("s45")}
`

const MediaDuration = styled.span`
  ${Fonts.unica("s16")}
`
