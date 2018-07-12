import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Elements", module).add("Checkbox", () => {
  return (
    <React.Fragment>
      <Section title="Checkbox">
        <Checkbox>Default</Checkbox>
      </Section>
      <Section title="Checkbox hover">
        <Checkbox hover>Default</Checkbox>
      </Section>
      <Section title="Checkbox Selected">
        <Checkbox selected>Click me</Checkbox>
      </Section>
      <Section title="Checkbox Disabled">
        <Checkbox disabled>Click me</Checkbox>
      </Section>
      <Section title="Checkbox Selected and Disabled">
        <Checkbox selected disabled>
          Click me
        </Checkbox>
      </Section>
      <Section title="Checkbox Error">
        <Checkbox error>Click me</Checkbox>
      </Section>
      <Section title="Checkbox Error Hover">
        <Checkbox error hover>
          Click me
        </Checkbox>
      </Section>
      <Section title="Checkbox Error Selected">
        <Checkbox error selected>
          Click me
        </Checkbox>
      </Section>
    </React.Fragment>
  )
})
