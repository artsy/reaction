import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { AuctionFAQ } from "../AuctionFAQ"

storiesOf("Styleguide/Components", module).add("AuctionFAQ", () => {
  return (
    <React.Fragment>
      <Section title="Auction FAQ Modal">
        <AuctionFAQ />
      </Section>
    </React.Fragment>
  )
})
