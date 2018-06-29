import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

import { ArtistCard, LargeArtistCard, SmallArtistCard } from "../ArtistCard"

const artist = {
  image: {
    cropped: {
      url: "https://picsum.photos/110/110/?random",
    },
  },
  name: "Francesca DiMattio",
  formatted_nationality_and_birthday: "American, b. 1979",
  id: "percy",
}

storiesOf("Styleguide/Components", module).add("ArtistCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Card">
        <ArtistCard artist={artist} />
      </Section>
      <Section title="Large Artist Card">
        <LargeArtistCard artist={artist} />
      </Section>
      <Section title="Small Artist Card">
        <SmallArtistCard artist={artist} />
      </Section>
    </React.Fragment>
  )
})
