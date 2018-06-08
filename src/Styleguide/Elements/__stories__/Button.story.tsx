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
            <Col>
              <Button>Follow</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="outline">View All</Button>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Button width="100%" size="large">
                Contact Gallery
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="outline" size="small">
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
