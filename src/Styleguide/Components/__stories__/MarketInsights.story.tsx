import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { MarketInsights } from "../MarketInsights"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"

storiesOf("Styleguide/Components", module).add("MarketInsights", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights insights={insights} />
      </Section>
    </React.Fragment>
  )
})
