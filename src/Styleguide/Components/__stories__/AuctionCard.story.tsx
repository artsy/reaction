import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { AuctionCard, LargeAuctionCard, SmallAuctionCard } from "../AuctionCard"

storiesOf("Styleguide/Components", module).add("AuctionCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Auction Card">
        <AuctionCard
          src="http://via.placeholder.com/200x180?text=+"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
      <Section title="Large Auction Card">
        <LargeAuctionCard
          src="http://via.placeholder.com/200x180?text=+"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
      <Section title="Small Auction Card">
        <SmallAuctionCard
          src="http://via.placeholder.com/200x180?text=+"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
    </React.Fragment>
  )
})
