import React, { Component } from "react"
import { Col, Grid, Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { Text } from '../Sections/Text'

interface Props {
  media?: any
}

export class VideoAbout extends Component<Props, null> {
  render() {
    const { media } = this.props
    return(
      <Grid>
        <Col>
          <Title>Credits</Title>
          <Row>

          </Row>
        </Col>
        <Col>
          <Title>About the Film</Title>
          <Text layout="standard" html={media.description} />
        </Col>
      </Grid>
    )
  }
}

const Title = styled.div`
  ${Fonts.unica("s34")}
  ${pMedia.md`
    ${Fonts.unica("s32")}
  `}
`
