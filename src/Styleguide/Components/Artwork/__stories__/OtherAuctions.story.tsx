import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { OtherAuctions } from "../OtherAuctions"
import { Section } from "../../../Utils/Section"
import { AuctionCard } from "../../../Components/AuctionCard"

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

storiesOf("Styleguide/Artwork", module).add("Other Auctions", () => {
  return (
    <Section title="Responsive Other Auctions">
      <OtherAuctions>
        {auctions.map(auction => <AuctionCard {...auction} />)}
      </OtherAuctions>
    </Section>
  )
})
