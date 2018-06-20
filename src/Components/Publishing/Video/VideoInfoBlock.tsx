import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import { Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { formatTime } from "../Constants"

interface Props {
  editTitle?: any
  media?: any
  subTitleLink?: string
  subTitle?: string
  title?: string
}

export class VideoInfoBlock extends Component<Props, null> {
  render() {
    const { editTitle, media, subTitle, subTitleLink, title } = this.props

    return (
      <div>
        <Row>
          {subTitle && (
            <SubTitle>
              {subTitleLink ? <a href={subTitleLink}>{subTitle}</a> : subTitle}
            </SubTitle>
          )}
          <MediaDuration>{formatTime(media.duration)}</MediaDuration>
        </Row>
        <Row>
          <MediaTitle>{editTitle || title}</MediaTitle>
        </Row>
      </div>
    )
  }
}

const SubTitle = styled.span`
  ${unica("s16")};
  margin-right: 35px;

  a {
    color: white;
    text-decoration: none;
  }
`

const MediaTitle = styled.span`
  position: relative;
  ${unica("s45")};
`

const MediaDuration = styled.span`
  ${unica("s16")};
`
