import { Spacer } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Spacer", () => {
  return (
    <Section title="Spacer">
      <div>A Spacer component...</div>
      <Spacer my={3} />
      <div>...spaces content.</div>
    </Section>
  )
})
