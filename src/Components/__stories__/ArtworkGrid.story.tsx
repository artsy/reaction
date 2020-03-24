import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { FullArtworkGrid } from "../_ArtworkGrid"

storiesOf("Styleguide/Components", module).add("ArtworkGrid", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <FullArtworkGrid artistID="andy-warhol" />
      </Section>
    </React.Fragment>
  )
})
