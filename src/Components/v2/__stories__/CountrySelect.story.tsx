import { selectProps } from "Apps/__tests__/Fixtures/Select"
import { CountrySelect } from "Components/v2"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

storiesOf("Styleguide/Components", module).add("Country Select", () => {
  return (
    <React.Fragment>
      <Section title="Country Select">
        <CountrySelect {...selectProps} />
      </Section>
    </React.Fragment>
  )
})
