import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { BorderBox } from "Styleguide/Elements/Box"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("BorderBox", () => {
  return (
    <>
      <Section title="BorderBox">
        <BorderBox>
          A BorderBox component is a component that has a border and contains
          content
        </BorderBox>
      </Section>

      <Section title="BorderBox with hover enabled">
        <BorderBox hover>
          A BorderBox component can have optional hover state
        </BorderBox>
      </Section>
    </>
  )
})
