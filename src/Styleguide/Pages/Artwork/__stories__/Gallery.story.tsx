import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Gallery, LargeGallery, SmallGallery } from "../Gallery"

storiesOf("Styleguide/Artwork", module).add("Gallery", () => {
  return (
    <React.Fragment>
      <Section title="Responsive">
        <Gallery
          src="https://picsum.photos/110/110/?random"
          headline="Salon 94"
          subHeadline="New York, London, Beijing, Hong Kong"
        />
      </Section>
      <Section title="Large Gallery">
        <LargeGallery
          src="https://picsum.photos/110/110/?random"
          headline="Salon 94"
          subHeadline="New York, London, Beijing, Hong Kong"
        />
      </Section>
      <Section title="Small Gallery">
        <SmallGallery
          src="https://picsum.photos/110/110/?random"
          headline="Salon 94"
          subHeadline="New York, London, Beijing, Hong Kong"
        />
      </Section>
    </React.Fragment>
  )
})
