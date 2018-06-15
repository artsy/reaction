import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Separator } from "../Separator"

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
