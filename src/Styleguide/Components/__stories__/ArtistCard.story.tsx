import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtistCard, LargeArtistCard, SmallArtistCard } from "../ArtistCard"

storiesOf("Styleguide/Components", module).add("ArtistCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Card">
        <ArtistCard
          src="https://picsum.photos/110/110/?random"
          headline="Francesca DiMattio"
          subHeadline="American, b. 1979"
        />
      </Section>
      <Section title="Large Artist Card">
        <LargeArtistCard
          src="https://picsum.photos/110/110/?random"
          headline="Francesca DiMattio"
          subHeadline="American, b. 1979"
        />
      </Section>
      <Section title="Small Artist Card">
        <SmallArtistCard
          src="https://picsum.photos/110/110/?random"
          headline="Francesca DiMattio"
          subHeadline="American, b. 1979"
        />
      </Section>
    </React.Fragment>
  )
})
