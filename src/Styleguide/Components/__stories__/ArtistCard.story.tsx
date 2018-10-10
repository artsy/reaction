import { RelayStubProvider } from "DevTools/RelayStubProvider"
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
  href: "/artist/francesca-dimattio",
  name: "Francesca DiMattio",
  formatted_nationality_and_birthday: "American, b. 1979",
  id: "percy",
}

storiesOf("Styleguide/Components", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("ArtistCard", () => {
    const props = {
      artist: artist as any,
      user: null,
    }

    return (
      <React.Fragment>
        <Section title="Responsive Artist Card">
          <ArtistCard {...props} />
        </Section>
        <Section title="Large Artist Card">
          <LargeArtistCard {...props} />
        </Section>
        <Section title="Small Artist Card">
          <SmallArtistCard {...props} />
        </Section>
      </React.Fragment>
    )
  })
