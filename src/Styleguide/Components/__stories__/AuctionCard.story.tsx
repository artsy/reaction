import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { AuctionCard, LargeAuctionCard, SmallAuctionCard } from "../AuctionCard"

storiesOf("Styleguide/Components", module).add("AuctionCard", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Auction Card">
        <AuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
      <Section title="Large Auction Card">
        <LargeAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
      <Section title="Small Auction Card">
        <SmallAuctionCard
          src="https://picsum.photos/200/180/?random"
          headline="Sotheby’s"
          subHeadline="Contemporary Day Sale"
          badge="In progress"
        />
      </Section>
    </React.Fragment>
  )
})
