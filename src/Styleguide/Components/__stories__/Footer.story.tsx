import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Footer, LargeFooter, SmallFooter } from "../Footer"

storiesOf("Legacy/Styleguide/Components", module).add("Footer", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Footer">
        <Footer />
      </Section>
      <Section title="Large Footer">
        <LargeFooter />
      </Section>
      <Section title="Small Footer">
        <SmallFooter />
      </Section>
    </React.Fragment>
  )
})
