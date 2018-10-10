import { Box } from "@artsy/palette"
// import { bio, biography_blurb } from "Apps/__test__/Fixtures/ArtistBio"
// import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
// import { exhibitions } from "Apps/__test__/Fixtures/SelectedExhibitions"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtistInfoQueryRenderer } from "../ArtistInfo"

storiesOf("Styleguide/Artwork", module).add("ArtistInfo", () => {
  return (
    <React.Fragment>
      <Section title="ArtistInfoQueryRenderer">
        <Box width="100%">
          <ArtistInfoQueryRenderer artistID="pablo-picasso" />
        </Box>
      </Section>
      <Section title="Artist with little content">
        <Box width="100%">
          <ArtistInfoQueryRenderer artistID="chonat-getz" />
        </Box>
      </Section>
    </React.Fragment>
  )
})
