import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ColorPreview } from "Styleguide/Utils/ColorPreview"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Colors", () => {
  return (
    <Section title="Colors">
      <ColorPreview />
    </Section>
  )
})
