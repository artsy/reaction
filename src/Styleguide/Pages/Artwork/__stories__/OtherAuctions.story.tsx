import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionCard } from "Styleguide/Components/AuctionCard"
import { Section } from "Styleguide/Utils/Section"
import { OtherAuctions } from "../OtherAuctions"

const auctions = [
  {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "https://picsum.photos/400/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "https://picsum.photos/200/600/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  },
  {
    src: "https://picsum.photos/200/180/?random",
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
