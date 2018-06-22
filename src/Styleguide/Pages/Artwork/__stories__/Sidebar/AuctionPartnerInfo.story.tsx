import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionPartnerInfo } from "Styleguide/Pages/Artwork/Sidebar/AuctionPartnerInfo"
import {
  ArtworkNoEstimateNoPremium,
  ArtworkWithEstimateAndPremium,
  ArtworkWithEstimateNoPremium,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/AuctionPartnerInfo"
import { Section } from "Styleguide/Utils/Section"

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
