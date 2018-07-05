import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Banner, LargeBanner, SmallBanner } from "../Banner"

storiesOf("Styleguide/Artwork", module).add("Banner", () => {
  return (
    <React.Fragment>
      <Section title="Responsive">
        <Banner
          src="http://via.placeholder.com/110x110?text=+"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Large Banner">
        <LargeBanner
          src="http://via.placeholder.com/110x110?text=+"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Small Banner">
        <SmallBanner
          src="http://via.placeholder.com/110x110?text=+"
          badge="In show"
          headline="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
    </React.Fragment>
  )
})
