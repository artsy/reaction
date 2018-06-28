import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { bio } from "Styleguide/Pages/Fixtures/ArtistBio"
import { artistResponse } from "Styleguide/Pages/Fixtures/MarketInsights"
import { exhibitions } from "Styleguide/Pages/Fixtures/SelectedExhibitions"
import { Section } from "Styleguide/Utils/Section"
import { ArtistInfo } from "../ArtistInfo"

storiesOf("Styleguide/Artwork", module).add("ArtistInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artist Info">
        <Grid>
          <Row>
            <Col md={8}>
              <ArtistInfo
                name="Francesca DiMattio"
                artist={artistResponse}
                exhibitions={exhibitions as any}
                bio={bio}
              />
            </Col>
          </Row>
        </Grid>
      </Section>
    </React.Fragment>
  )
})
