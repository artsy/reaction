import { Flex, Sans } from "@artsy/palette"
import React, { Component } from "react"
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
        <Flex>
          {subTitle && (
            <SubTitle size="3" mr={20}>
              {subTitleLink ? <a href={subTitleLink}>{subTitle}</a> : subTitle}
            </SubTitle>
          )}
          {media.duration && <Sans size="3">{formatTime(media.duration)}</Sans>}
        </Flex>

        <Sans size="10">{editTitle || title}</Sans>
      </div>
    )
  }
}

const SubTitle = styled(Sans)`
  a {
    color: white;
    text-decoration: none;
  }
`
