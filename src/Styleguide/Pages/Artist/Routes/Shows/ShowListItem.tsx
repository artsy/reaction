import React from "react"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Serif } from "@artsy/palette"
import { Box } from "Styleguide/Elements/Box"
import { Separator } from "Styleguide/Elements/Separator"

export const ShowListItem = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallShowListItem {...props} />
        else return <LargeShowListItem {...props} />
      }}
    </Responsive>
  )
}

const LargeShowListItem = props => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Serif size="2">May 22-29, 2018</Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            <a href="#" className="noUnderline">
              Brookhart Jonquil: Endless Light in an Endless Night
            </a>
          </Serif>
          <Serif size="2" color="black60">
            <a href="#" className="noUnderline">
              Toth Gallery
            </a>
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

const SmallShowListItem = props => {
  return (
    <React.Fragment>
      <Serif size="3">
        <a href="#" className="noUnderline">
          Brookhart Jonquil: Endless Light in an Endless Night
        </a>
      </Serif>
      <Serif size="2" color="black60">
        <a href="#" className="noUnderline">
          Toth Gallery
        </a>
      </Serif>
      <Serif size="1" color="black60">
        May 22-29, 2018
      </Serif>
      <Box pt={3} pb={1}>
        <Separator />
      </Box>
    </React.Fragment>
  )
}
