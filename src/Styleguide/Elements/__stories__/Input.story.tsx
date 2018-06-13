import React from "react"
import { Section } from "../../Utils/Section"
import { Checkbox } from "../Checkbox"
import { Radio } from "../Radio"
import { storiesOf } from "storybook/storiesOf"

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
