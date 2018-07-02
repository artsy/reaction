import { bio } from "Apps/__test__/Fixtures/ArtistBio"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtistBio } from "../ArtistBio"

storiesOf("Styleguide/Components", module).add("ArtistBio", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <ArtistBio
          bio={{ biography_blurb: { text: bio, credit: "Gagosian" } }}
        />
      </Section>
    </React.Fragment>
  )
})
