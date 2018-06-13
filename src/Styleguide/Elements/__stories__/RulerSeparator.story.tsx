import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../Utils/Section"
import { RulerSeparator } from "../RulerSeparator"

storiesOf("Styleguide/Elements", module).add("RulerSeparator", () => {
  return (
    <React.Fragment>
      <Section title="One version for now with 20px space at the bottom">
        <RulerSeparator />
        Some text
        <RulerSeparator />
        Some other text to separate
        <RulerSeparator />
      </Section>
    </React.Fragment>
  )
})
