import React, { Component } from "react"
import { Col } from 'react-styled-flexboxgrid'
import styled, { StyledFunction } from "styled-components"
import { media } from "../../Helpers"
import { ShareDate } from "../Byline/ShareDate"
import { Fonts } from "../Fonts"
import { Text } from '../Sections/Text'

interface Props {
  article: any
  color?: string
}

interface TitleProps {
  color: string
}

export class VideoAbout extends Component<Props, null> {
  static defaultProps = {
    color: "black"
  }

  render() {
    const { article, color } = this.props
    const { media } = article
    return (
      <VideoAboutContainer>
        <Col xs={12} sm={4}>
          <Title color={color}>
            Credits
          </Title>
          <Text
            layout="standard"
            html={media.credits}
          />
          <ShareDate
            color={color}
            article={article}
          />
        </Col>

        <Col xs={12} sm={8}>
          <Title color={color}>
            About the Film
          </Title>
          <Text layout="standard" html={media.description} />
          <ShareDate
            color={color}
            article={article}
          />
        </Col>
      </VideoAboutContainer>
    )
  }
}

const Div: StyledFunction<TitleProps> = styled.div
const Title = Div`
  color: ${props => props.color};
  margin-bottom: 15px;
  ${Fonts.unica("s34")}

  ${media.sm`
    ${Fonts.unica("s32")}
  `}
`

export const VideoAboutContainer = styled.div`
  display: flex;
  ${ShareDate} {
    margin-top: 40px;
  }

  ${Col} {
    flex: 1;
  }

  ${Col}:nth-of-type(1) {
    ${ShareDate} {
      display: none
    }
  }

  ${media.sm`
    flex-direction: column-reverse;
    ${ShareDate} {
      margin-top: 40px;
      align-self: flex-start;
    }
    ${Col}:first-of-type {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      ${ShareDate} {
        display: none;
      }
    }
  `}
`
