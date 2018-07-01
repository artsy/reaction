import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Radio } from "Styleguide/Elements/Radio"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Radio", () => {
  return (
    <Section title="Radio">
      <Radio>Click me</Radio>
      <Radio selected>Selected</Radio>
    </Section>
  )
})
