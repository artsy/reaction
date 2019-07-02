import { artistResponse } from "Apps/__tests__/Fixtures/MarketInsights"
import { MarketInsights } from "Components/v2/ArtistMarketInsights"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

storiesOf("Components", module).add("MarketInsights v1", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights artist={artistResponse as any} />
      </Section>
    </React.Fragment>
  )
})
