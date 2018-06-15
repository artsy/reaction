import React from "react"
import { Section } from "Styleguide/Utils/Section"
import { ColorPreview } from "Styleguide/Utils/ColorPreview"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Colors", () => {
  return (
    <Section title="Colors">
      <ColorPreview />
    </Section>
  )
})
