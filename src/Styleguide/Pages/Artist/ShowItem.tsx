import React from "react"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Serif } from "@artsy/palette"
import { Box } from "Styleguide/Elements/Box"
import { Separator } from "Styleguide/Elements/Separator"

export const ShowItem = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallShowItem {...props} />
        else return <LargeShowItem {...props} />
      }}
    </Responsive>
  )
}

const LargeShowItem = props => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Serif size="2">May 22-29, 2018</Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            Brookhart Jonquil: Endless Light in an Endless Night
          </Serif>
          <Serif size="2" color="black60">
            Toth Gallery
          </Serif>
        </Col>
        <Col sm={3}>
          <Serif size="2">London</Serif>
        </Col>
      </Row>

      <Box pt={3} pb={1}>
        <Separator />
      </Box>
    </React.Fragment>
  )
}

const SmallShowItem = props => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Serif size="2">May 22-29, 2018</Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            Brookhart Jonquil: Endless Light in an Endless Night
          </Serif>
          <Serif size="2" color="black60">
            Toth Gallery
          </Serif>
        </Col>
        <Col sm={3}>
          <Serif size="2">London</Serif>
        </Col>
      </Row>

      <Box pt={3} pb={1}>
        <Separator />
      </Box>
    </React.Fragment>
  )
}
