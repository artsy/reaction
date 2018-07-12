import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Elements", module).add("Flex", () => {
  return (
    <Section title="Flex">
      <Flex>
        A Flex component is a layout container for content that exposes props
        related flexbox.
      </Flex>
    </Section>
  )
})
