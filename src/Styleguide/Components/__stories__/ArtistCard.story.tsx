import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtistCard } from "../ArtistCard"
import { Section } from "../../Utils/Section"

storiesOf("Styleguide/Components", module).add("ArtistCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive">
        <ArtistCard
          src="https://picsum.photos/110/110/?random"
          headline="Francesca DiMattio"
          subHeadline="American, b. 1979"
        />
      </Section>
    </React.Fragment>
  )
})
