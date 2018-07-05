import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionCard } from "Styleguide/Components/AuctionCard"
import { Section } from "Styleguide/Utils/Section"
import { OtherAuctions } from "../OtherAuctions"

const auctions = [
  {
    src: "http://via.placeholder.com/200x180?text=+",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "http://via.placeholder.com/400x180?text=+",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "http://via.placeholder.com/200x600?text=+",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "http://via.placeholder.com/200x180?text=+",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
]

storiesOf("Styleguide/Artwork/OtherAuctions", module).add(
  "Other Auctions",
  () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions>
          {auctions.map(auction => <AuctionCard {...auction} />)}
        </OtherAuctions>
      </Section>
    )
  }
)
