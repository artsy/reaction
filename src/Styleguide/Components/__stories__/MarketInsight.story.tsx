import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { MarketInsights } from "../MarketInsights"

export const insights = [
  {
    primaryLabel: "High auction record",
    secondaryLabel: "$105m sale, Sotheby’s 2013",
  },
  {
    primaryLabel: "Blue Chip",
    secondaryLabel: "Represented by internationally recognized galleries.",
  },
  {
    primaryLabel: "Collected by major museums",
    secondaryLabel: "Tate, Museum of Modern Art (MoMA)",
  },
]

storiesOf("Styleguide/Components", module).add("MarketInsights", () => {
  return (
    <React.Fragment>
      <Section title="Market Insights">
        <MarketInsights insights={insights} />
      </Section>
    </React.Fragment>
  )
})
