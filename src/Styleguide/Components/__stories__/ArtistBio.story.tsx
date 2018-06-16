import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtistBio } from "../ArtistBio"
import { bio } from "Styleguide/Pages/Fixtures/ArtistBio"

storiesOf("Styleguide/Components", module).add("ArtistBio", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <ArtistBio>{bio}</ArtistBio>
      </Section>
    </React.Fragment>
  )
})
