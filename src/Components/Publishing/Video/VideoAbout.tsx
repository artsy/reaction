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

  renderCreditRole = (role, people, pluralize = true) => {
    return (
      <CreditRoleRow>
        <CreditTitle>
          {`${role}${people.length > 1 && pluralize ? "s" : ""}`}
        </CreditTitle>
        {people.map((person) => {
          return (
            <CreditName>
              {person}
            </CreditName>
          )
        })}
      </CreditRoleRow>
    )
  }

  render() {
    const { article } = this.props
    const { credits, media } = article
    return (
      <Row>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          first="sm"
          last="md"
        >
          <Title>
            Credits
          </Title>
          {credits.directors &&
            this.renderCreditRole("Director", credits.directors)
          }
          {credits.featuring &&
            this.renderCreditRole("Featuring", credits.featuring, false)
          }
        </Col>

        <Col xs={12} sm={12} md={6} lg={6}>
          <Title>
            About the Film
          </Title>
          <Text layout="standard" html={media.description} />
        </Col>

      </Row>
    )
  }
}

const Title = styled.div`
  ${Fonts.unica("s34")}
  ${pMedia.md`
    ${Fonts.unica("s32")}
  `}
`
const CreditTitle = styled.div`
  ${Fonts.unica("s16")}
`
const CreditName = styled.div`
  ${Fonts.garamond("s14")}
`
const CreditRoleRow = styled(Row)`
  margin-bottom: 20px;
`
