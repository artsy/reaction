import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Banner, LargeBanner, SmallBanner } from "../ArtworkBanner/Banner"

storiesOf("Styleguide/Artwork", module).add("Banner", () => {
  return (
    <React.Fragment>
      <Section title="Responsive with image">
        <Banner
          imageUrl="https://picsum.photos/110/110/?random"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Large Banner with initials">
        <LargeBanner
          imageUrl={null}
          initials="OU"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Small Banner">
        <SmallBanner
          imageUrl="https://picsum.photos/110/110/?random"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
    </React.Fragment>
  )
})
