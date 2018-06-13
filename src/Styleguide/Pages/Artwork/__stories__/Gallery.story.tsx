import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Gallery, SmallGallery, LargeGallery } from "../Gallery"
import { Section } from "../../../Utils/Section"

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
