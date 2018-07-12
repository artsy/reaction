import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { MarketInsights } from "../MarketInsights"

storiesOf("Legacy/Styleguide/Components", module).add("MarketInsights", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights artist={artistResponse} />
      </Section>
    </React.Fragment>
  )
})
