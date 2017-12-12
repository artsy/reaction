import React, { Component } from "react"
import { Col, Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { Text } from '../Sections/Text'

interface Props {
  article: any
}

export class VideoAbout extends Component<Props, null> {
  render() {
    const { article } = this.props
    const { media } = article
    return (
      <VideoAboutRow>
        <Col
          xs={12}
          sm={4}
          first="xs"
          last="sm"
        >
          <Title>
            Credits
          </Title>
          <Text layout="standard" html={media.credits} />
        </Col>

        <Col xs={12} sm={8} md={8} lg={8}>
          <Title>
            About the Film
          </Title>
          <Text layout="standard" html={media.description} />
        </Col>
      </VideoAboutRow>
    )
  }
}

const Title = styled.div`
  margin-bottom: 15px;
  ${Fonts.unica("s34")}
  ${pMedia.md`
    ${Fonts.unica("s32")}
  `}
`
const VideoAboutRow = styled(Row)`
  max-width: 1200px;
  margin: 60px auto;
`
