import { artistResponse } from "Apps/__tests__/Fixtures/MarketInsights"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { MarketInsights } from "../ArtistMarketInsights"

storiesOf("Styleguide/Components", module).add("MarketInsights", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights artist={artistResponse as any} />
      </Section>
    </React.Fragment>
  )
})
