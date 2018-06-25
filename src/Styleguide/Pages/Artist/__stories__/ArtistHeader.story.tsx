import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Box } from "Styleguide/Elements/Box"
import { Section } from "Styleguide/Utils/Section"
import {
  ArtistHeader,
  LargeArtistHeader,
  SmallArtistHeader,
} from "../Components/ArtistHeader"

const artist = {
  carousel: {
    images: [
      { resized: { url: "https://picsum.photos/500/200/?random" } },
      { resized: { url: "https://picsum.photos/500/200/?random" } },
      { resized: { url: "https://picsum.photos/500/200/?random" } },
    ],
  },
}

storiesOf("Styleguide/Artist", module).add("ArtistHeader", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Header">
        <Box width="98%">
          <ArtistHeader artist={artist as any} />
        </Box>
      </Section>
      <Section title="Large Artist Header">
        <Box width="98%">
          <LargeArtistHeader artist={artist as any} />
        </Box>
      </Section>
      <Section title="Small Artist Header">
        <Box width="100%">
          <SmallArtistHeader artist={artist as any} />
        </Box>
      </Section>
    </React.Fragment>
  )
})
