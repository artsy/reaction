import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { bio } from "Styleguide/Pages/Fixtures/ArtistBio"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { exhibitions } from "Styleguide/Pages/Fixtures/SelectedExhibitions"
import { Section } from "Styleguide/Utils/Section"
import { ArtistInfo } from "../ArtistInfo"

storiesOf("Styleguide/Artwork", module).add("ArtistInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artist Info">
        <Grid>
          <Row>
            <Col xl={8} lg={8} md={8} sm={12} xs={12}>
              <ArtistInfo
                name="Francesca DiMattio"
                insights={insights}
                exhibitions={exhibitions}
                bio={bio}
              />
            </Col>
          </Row>
        </Grid>
      </Section>
    </React.Fragment>
  )
})
