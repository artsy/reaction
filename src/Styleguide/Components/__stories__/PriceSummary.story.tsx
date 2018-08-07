import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { PriceSummary } from "Styleguide/Components/PriceSummary"
import { Flex } from "Styleguide/Elements/Flex"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("PriceSummary", () => {
  return (
    <Section title="Price Summary">
      <Flex width={280} flexDirection="column">
        <PriceSummary
          price="£3,024.89"
          shipping="£132.32"
          tax="£232.23"
          total="£1,200,823.33"
        />
      </Flex>
    </Section>
  )
})
