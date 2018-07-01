import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Checkbox", () => {
  return (
    <Section title="Checkbox">
      <Checkbox>Click me</Checkbox>
      <Checkbox selected>Selected</Checkbox>
    </Section>
  )
})
