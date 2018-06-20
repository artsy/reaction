import React from "react"
import { Section } from "Styleguide/Utils/Section"
import { Select, LargeSelect, SmallSelect } from "../Select"
import { storiesOf } from "storybook/storiesOf"
import { selectProps } from "Styleguide/Pages/Fixtures/Select"

storiesOf("Styleguide/Elements", module).add("Select", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Select">
        <Select {...selectProps} />
      </Section>
      <Section title="Large Select">
        <LargeSelect {...selectProps} />
      </Section>
      <Section title="Small Select">
        <SmallSelect {...selectProps} />
      </Section>
    </React.Fragment>
  )
})
