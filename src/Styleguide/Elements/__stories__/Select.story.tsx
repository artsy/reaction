import { LargeSelect, SmallSelect } from "@artsy/palette"
import { selectProps } from "Apps/__test__/Fixtures/Select"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Select", () => {
  return (
    <React.Fragment>
      <Section title="Large Select">
        <LargeSelect {...selectProps} />
      </Section>
      <Section title="Small Select">
        <SmallSelect {...selectProps} />
      </Section>
    </React.Fragment>
  )
})
