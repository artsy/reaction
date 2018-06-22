import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Box } from "Styleguide/Elements/Box"
import { Section } from "Styleguide/Utils/Section"
import {
  ArtistHeader,
  LargeArtistHeader,
  SmallArtistHeader,
} from "../ArtistHeader"

storiesOf("Styleguide/Artist", module).add("ArtistHeader", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Header">
        <Box width="98%">
          <ArtistHeader />
        </Box>
      </Section>
      <Section title="Large Artist Header">
        <Box width="98%">
          <LargeArtistHeader />
        </Box>
      </Section>
      <Section title="Small Artist Header">
        <Box width="100%">
          <SmallArtistHeader />
        </Box>
      </Section>
    </React.Fragment>
  )
})
