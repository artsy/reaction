import { bio } from "Apps/__tests__/Fixtures/ArtistBio"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { ArtistBio } from "../ArtistBio"

storiesOf("Styleguide/Components", module).add("ArtistBio", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <ArtistBio
          bio={{ biography_blurb: { text: bio, credit: "Gagosian" } } as any}
        />
      </Section>
      <Section title="Small bio">
        <ArtistBio
          bio={
            {
              biography_blurb: {
                text: "Hello how are you",
                credit: "Gagosian",
              },
            } as any
          }
        />
      </Section>
    </React.Fragment>
  )
})
