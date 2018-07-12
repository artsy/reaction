import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Elements", module).add("Grid", () => {
  return (
    <Section title="Grid">
      <Grid>
        <Row>
          <Col>A Grid component is a flexible 12 column flexbox grid.</Col>
        </Row>
      </Grid>
    </Section>
  )
})
