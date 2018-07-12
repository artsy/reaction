import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Arrow } from "../Arrow"

storiesOf("Legacy/Styleguide/Elements", module).add("Arrow", () => {
  return (
    <React.Fragment>
      <Section title="Arrow">
        <Arrow direction="left" />
        <Arrow direction="right" />
        <Arrow direction="up" />
        <Arrow direction="down" />
      </Section>
    </React.Fragment>
  )
})
