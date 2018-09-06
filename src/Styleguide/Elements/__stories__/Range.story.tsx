import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Range } from "Styleguide/Elements/Range"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Range", () => {
  return (
    <Section title="Range">
      <Range
        allowCross={false}
        min={50}
        max={50000}
        step={50}
        defaultValue={[50, 50000]}
      />
    </Section>
  )
})
