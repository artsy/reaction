import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { PricingTransparency } from "../PricingTransparency"

storiesOf("Apps/Auction/Components", module).add("Pricing Transparency", () => {
  return (
    <Section>
      <PricingTransparency />
    </Section>
  )
})
