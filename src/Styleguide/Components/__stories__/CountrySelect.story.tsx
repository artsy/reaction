import { selectProps } from "Apps/__tests__/Fixtures/Select"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { CountrySelect } from "Styleguide/Components"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Country Select", () => {
  return (
    <React.Fragment>
      <Section title="Country Select">
        <CountrySelect {...selectProps} />
      </Section>
    </React.Fragment>
  )
})
