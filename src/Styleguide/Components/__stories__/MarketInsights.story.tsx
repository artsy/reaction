import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { artistResponse } from "Styleguide/Pages/Fixtures/MarketInsights"
import { Section } from "Styleguide/Utils/Section"
import { MarketInsights } from "../MarketInsights"

storiesOf("Styleguide/Components", module).add("MarketInsights", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights artist={artistResponse} />
      </Section>
    </React.Fragment>
  )
})
