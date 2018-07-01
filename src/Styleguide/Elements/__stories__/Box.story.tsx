import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Box } from "Styleguide/Elements/Box"
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
