import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../Utils/Section"
import {
  AuctionResultItem,
  ExtraSmallAuctionResultItem,
  LargeAuctionResultItem,
  SmallAuctionResultItem,
} from "../AuctionResultItem"

storiesOf("Styleguide/Components", module).add("AuctionResultItem", () => {
  const dimensions = "14 1/2 x 76 1/2 x 25 1/2 in"

  return (
    <React.Fragment>
      <Section title="Responsive Auction Result Item">
        <AuctionResultItem
          imageUrl="https://picsum.photos/200/180/?random"
          organization="Sotheby’s"
          title="Plan B"
          date="2011"
          dimensions={dimensions}
          auctionDate="February 10, 2015"
          salePrice="GBP 1,408,000"
          estimate="GBP 400,000 - GBP 600,000"
          description="anodized aluminum clear and black with amber and black Plexiglass bottom..."
        />
      </Section>
      <Section title="Large Auction Result Item">
        <LargeAuctionResultItem
          imageUrl="https://picsum.photos/200/180/?random"
          organization="Sotheby’s"
          title="Plan B"
          date="2011"
          dimensions={dimensions}
          auctionDate="February 10, 2015"
          salePrice="GBP 1,408,000"
          estimate="GBP 400,000 - GBP 600,000"
          description="anodized aluminum clear and black with amber and black Plexiglass bottom..."
        />
      </Section>
      <Section title="Small Auction Result Item">
        <SmallAuctionResultItem
          imageUrl="https://picsum.photos/200/180/?random"
          organization="Sotheby’s"
          title="Plan B"
          date="2011"
          dimensions={dimensions}
          auctionDate="February 10, 2015"
          salePrice="GBP 1,408,000"
          estimate="GBP 400,000 - GBP 600,000"
          description="anodized aluminum clear and black with amber and black Plexiglass bottom..."
        />
      </Section>
      <Section title="Extra Small Result Item">
        <ExtraSmallAuctionResultItem
          imageUrl="https://picsum.photos/200/180/?random"
          organization="Sotheby’s"
          title="Plan B"
          date="2011"
          dimensions={dimensions}
          auctionDate="February 10, 2015"
          salePrice="GBP 1,408,000"
          estimate="GBP 400,000 - GBP 600,000"
          description="anodized aluminum clear and black with amber and black Plexiglass bottom..."
        />
      </Section>
    </React.Fragment>
  )
})
