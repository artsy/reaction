import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../../../Utils/Section"
import { AuctionPartnerInfo } from "../../Sidebar/AuctionPartnerInfo"

const ArtworkNoEstimateNoPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: {
    __id: "phillips",
    name: "Phillips",
  },
  sale_artwork: {},
  sale: {
    is_with_buyers_premium: false,
  },
}

const ArtworkWithEstimateNoPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: {
    __id: "phillips",
    name: "Phillips",
  },
  sale_artwork: {
    estimate: "$300 - $500",
  },
  sale: {
    is_with_buyers_premium: false,
  },
}

const ArtworkWithEstimateAndPremium = {
  _id: "auction_artwork",
  is_biddable: true,
  partner: {
    __id: "phillips",
    name: "Phillips",
  },
  sale_artwork: {
    estimate: "$300 - $500",
  },
  sale: {
    is_with_buyers_premium: true,
  },
}

storiesOf("Styleguide/Artwork/Sidebar", module).add(
  "AuctionPartnerInfo",
  () => {
    return (
      <React.Fragment>
        <Section title="Auction name only">
          <AuctionPartnerInfo artwork={ArtworkNoEstimateNoPremium} />
        </Section>
        <Section title="Artwork with estimate">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateNoPremium} />
        </Section>
        <Section title="Artwork with estimate and buyer's premium">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateAndPremium} />
        </Section>
      </React.Fragment>
    )
  }
)
