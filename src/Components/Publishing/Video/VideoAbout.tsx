import styled from "styled-components"
import React, { Component } from "react"
import { Col } from "react-styled-flexboxgrid"
import { pMedia } from "../../Helpers"
import { ShareDate } from "../Byline/ShareDate"
import { unica } from "Assets/Fonts"
import { Text } from "../Sections/Text"

export interface VideoAboutProps {
  article: any
  color?: string
  editDescription?: any
  editCredits?: any
}

export class VideoAbout extends Component<VideoAboutProps, null> {
  static defaultProps = {
    color: "black",
  }

  render() {
    const { article, color, editCredits, editDescription } = this.props
    const {
      media: { credits, description },
    } = article

    return (
      <VideoAboutContainer>
        <Credits xs={12} sm={4}>
          <Col xs={12}>
            <Title color={color}>Credits</Title>

            {editCredits ? (
              <Text layout="standard">{editCredits}</Text>
            ) : (
              <Text layout="standard" html={credits} />
            )}
          </Col>
          <Col sm={12} xs={false}>
            <ShareDate color={color} article={article} />
          </Col>
        </Credits>

        <About xs={12} sm={8}>
          <Col xs={12}>
            <Title color={color}>About the Film</Title>

            {editDescription ? (
              <Text color={color} layout="standard">
                {editDescription}
              </Text>
            ) : (
              <Text color={color} layout="standard" html={description} />
            )}
          </Col>

          <Col sm={false} xs={12}>
            <ShareDate color={color} article={article} />
          </Col>
        </About>
      </VideoAboutContainer>
    )
  }
}

const Title = styled.div.attrs<{ color: string }>({})`
  color: ${props => props.color};
  margin-bottom: 15px;
  ${unica("s34")} ${pMedia.sm`
    ${unica("s32")}
  `};
`

const Credits = Col.extend`
  flex: 1;

  p {
    padding: 0;
  }

  ${pMedia.sm`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
  `};
`

const About = Col.extend`
  flex: 1;
`

export const VideoAboutContainer = styled.div`
  display: flex;

  ${ShareDate} {
    margin-top: 40px;
  }

  ${pMedia.sm`
    flex-direction: column-reverse !important;
  `};
`
