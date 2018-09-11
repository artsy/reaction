import { Separator } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Separator", () => {
  return (
    <React.Fragment>
      <Section title="One version for now with 20px space at the bottom">
        <Separator />
        Some text
        <Separator />
        Some other text to separate
        <Separator />
      </Section>
    </React.Fragment>
  )
})
