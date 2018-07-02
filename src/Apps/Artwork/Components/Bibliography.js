import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"

export const Bibliography = () => {
  return (
    <Content>
      <Row>
        <Col>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const Text = styled.div``
