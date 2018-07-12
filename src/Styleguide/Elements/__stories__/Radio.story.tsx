import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Radio } from "Styleguide/Elements/Radio"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Elements", module).add("Radio", () => {
  return (
    <React.Fragment>
      <Section title="Radio">
        <Radio>Click me</Radio>
      </Section>
      <Section title="Radio Hover">
        <Radio hover>Click me</Radio>
      </Section>
      <Section title="Radio Selected">
        <Radio selected>Selected</Radio>
      </Section>
      <Section title="Radio Disabled">
        <Radio disabled>Disabled</Radio>
      </Section>
      <Section title="Radio Selected and Disabled">
        <Radio selected disabled>
          Disabled
        </Radio>
      </Section>
    </React.Fragment>
  )
})
