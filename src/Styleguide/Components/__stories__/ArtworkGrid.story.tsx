import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { FullArtworkGrid } from "../ArtworkGrid"

storiesOf("Styleguide/Components", module).add("ArtworkGrid", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <FullArtworkGrid artistID="andy-warhol" />
      </Section>
    </React.Fragment>
  )
})
