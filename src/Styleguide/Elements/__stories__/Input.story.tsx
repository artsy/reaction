import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Checkbox } from "../Checkbox"
import { Radio } from "../Radio"

storiesOf("Styleguide/Elements", module).add("Inputs", () => {
  return (
    <React.Fragment>
      <Section title="Checkbox">
        <Checkbox>Check me</Checkbox>
        <Checkbox selected>Check me</Checkbox>
      </Section>
      <Section title="Radio">
        <Radio>Click me</Radio>
        <Radio selected>Selected</Radio>
      </Section>
    </React.Fragment>
  )
})
