import { storiesOf } from "storybook/storiesOf"
import React from "react"
import styled from "styled-components"
import { Button, Grid, Row, Col } from "../"
import { withInfo } from "@storybook/addon-info"

storiesOf("Styleguide/Elements", module).add(
  "Button",
  withInfo(`
      hey
    `)(() => {
    return (
      <Container>
        <Grid>
          <Row>
            <Col xs={3}>
              <Button variant="primaryBlack" size="small">
                Follow
              </Button>
            </Col>
            <Col xs={3} bg="black" my={3} py={3}>
              <Button variant="primaryWhite" size="small">
                Follow
              </Button>
            </Col>
            <Col xs={3}>
              <Button variant="secondaryOutline" size="small">
                Follow
              </Button>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col xs={3}>
              <Button variant="primaryBlack" size="medium">
                Follow
              </Button>
            </Col>
            <Col xs={3} bg="black" my={3} py={3}>
              <Button variant="primaryWhite" size="medium">
                Follow
              </Button>
            </Col>
            <Col xs={3}>
              <Button variant="secondaryOutline" size="medium">
                Follow
              </Button>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col xs={6}>
              <Button variant="primaryBlack" size="large">
                Follow
              </Button>
            </Col>
            <Col xs={6} bg="black" my={3} py={3}>
              <Button variant="primaryWhite" size="large">
                Follow
              </Button>
            </Col>
            <Col xs={3}>
              <Button variant="secondaryOutline" size="large">
                Follow
              </Button>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col>
              <Button width="100%" size="large">
                Contact Gallery
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="secondaryOutline" size="small">
                Log in to see price
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    )
  })
)

const Container = styled.div`
  ${Row} {
    margin: 10px;
  }
`
