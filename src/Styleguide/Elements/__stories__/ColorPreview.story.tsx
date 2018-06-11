import React from "react"
import { Section } from "../../Utils/Section"
import { ColorPreview } from "../../Utils/ColorPreview"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Colors", () => {
  return (
    <Section title="Colors">
      <ColorPreview />
    </Section>
  )
})
