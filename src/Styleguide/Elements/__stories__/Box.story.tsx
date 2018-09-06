import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Elements", module).add("Box", () => {
  return (
    <Section title="Box">
      <Box>
        A Box component is a container for content that exposes props for space,
        positioning, size and more.
      </Box>
    </Section>
  )
})
