import { bio } from "Apps/__test__/Fixtures/ArtistBio"
import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
import { exhibitions } from "Apps/__test__/Fixtures/SelectedExhibitions"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
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
                artist={artistResponse as any}
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
