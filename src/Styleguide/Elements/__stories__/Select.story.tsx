import React from "react"
import { Section } from "../../Utils/Section"
import { Select, LargeSelect, SmallSelect } from "../Select"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Select", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Select">
        <Select />
      </Section>
      <Section title="Large Select">
        <LargeSelect />
      </Section>
      <Section title="Small Select">
        <SmallSelect />
      </Section>
    </React.Fragment>
  )
})
