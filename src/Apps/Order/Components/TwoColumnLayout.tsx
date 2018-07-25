import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

export const TwoColumnLayout = props => (
  <Responsive>
    {({ xs }) => (xs ? <XsLayout {...props} /> : <DefaultLayout {...props} />)}
  </Responsive>
)

const DefaultLayout = ({ Content, Sidebar }) => (
  <Row>
    <Col col={7}>{Content}</Col>
    <Col col={1} />
    <Col col={4}>{Sidebar}</Col>
  </Row>
)

const XsLayout = ({ Content, Sidebar }) => (
  <Row>
    <Col>{Content}</Col>
    <Col>{Sidebar}</Col>
  </Row>
)
