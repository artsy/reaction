import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import { Col } from "react-styled-flexboxgrid"
// @ts-ignore
import styled, { StyledComponentClass, StyledFunction } from "styled-components"
import { media } from "../../Helpers"
import { ShareDate } from "../Byline/ShareDate"
import { Text } from "../Sections/Text"

export interface VideoAboutProps {
  article: any
  color?: string
  editDescription?: any
  editCredits?: any
}

export interface TitleProps {
  color: string
}

export class VideoAbout extends Component<VideoAboutProps, null> {
  static defaultProps = {
    color: "black",
  }

  render() {
    const { article, color, editCredits, editDescription } = this.props
    const { media } = article

    return (
      <VideoAboutContainer>
        <Col xs={12} sm={4}>
          <Title color={color}>Credits</Title>
          {editCredits ? (
            <Text layout="standard">{editCredits}</Text>
          ) : (
            <Text layout="standard" html={media.credits} />
          )}
          <ShareDate color={color} article={article} />
        </Col>

        <Col xs={12} sm={8}>
          <Title color={color}>About the Film</Title>
          {editDescription ? (
            <Text color={color} layout="standard">
              {editDescription}
            </Text>
          ) : (
            <Text color={color} layout="standard" html={media.description} />
          )}
          <ShareDate color={color} article={article} />
        </Col>
      </VideoAboutContainer>
    )
  }
}

const Div: StyledFunction<TitleProps> = styled.div
const Title = Div`
  color: ${props => props.color};
  margin-bottom: 15px;
  ${unica("s34")}

  ${media.sm`
    ${unica("s32")}
  `}
`

export const VideoAboutContainer = styled.div`
  display: flex;
  width: 100%;

  ${ShareDate} {
    margin-top: 40px;
  }

  ${Col} {
    flex: 1;
  }

  ${Col}:first-of-type {
    p {
      padding: 0px;
    }
  }

  ${Col}:nth-of-type (2) {
    ${ShareDate} {
      display: none;
    }
  }

  ${media.sm`
    flex-direction: column-reverse;

    ${Col}:first-of-type {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      ${ShareDate} {
        display: none;
      }
    }

    ${Col}:nth-of-type(2) {
      ${ShareDate} {
        display: block;
        margin-top: 40px;
        align-self: flex-start;
      }
    }
  `};
`
