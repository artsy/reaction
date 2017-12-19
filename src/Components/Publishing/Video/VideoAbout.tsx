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
  editDescription?: any
  editCredits?: any
}

interface TitleProps {
  color: string
}

export class VideoAbout extends Component<Props, null> {
  static defaultProps = {
    color: "black"
  }

  render() {
    const {
      article,
      color,
      editCredits,
      editDescription
    } = this.props
    const { media } = article

    return (
      <VideoAboutContainer>
        <Col xs={12} sm={4}>
          <Title color={color}>
            Credits
          </Title>
          {editCredits
            ? <Text layout="standard">{editCredits}</Text>
            : <Text layout="standard" html={media.credits} />
          }
          <ShareDate
            color={color}
            article={article}
          />
        </Col>

        <Col xs={12} sm={8}>
          <Title color={color}>
            About the Film
          </Title>
          {editDescription
            ? <Text layout='standard'>{editDescription}</Text>
            : <Text layout="standard" html={media.description} />
          }
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

  ${Col}:first-of-type {
    p {
      padding: 0px;
    }
  }

  ${Col}:nth-of-type(2) {
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
  `}
`
