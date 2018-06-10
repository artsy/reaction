import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Banner, SmallBanner, LargeBanner } from "../Banner"
import { Section } from "../../../Utils/Section"

storiesOf("Styleguide/Artwork", module).add("Banner", () => {
  return (
    <React.Fragment>
      <Section title="Responsive">
        <Banner
          src="https://picsum.photos/110/110/?random"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Large Banner">
        <LargeBanner
          src="https://picsum.photos/110/110/?random"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Small Banner">
        <SmallBanner
          src="https://picsum.photos/110/110/?random"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
    </React.Fragment>
  )
})
