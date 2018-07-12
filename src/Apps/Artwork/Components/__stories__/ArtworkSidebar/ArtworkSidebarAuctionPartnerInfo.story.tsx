import {
  ArtworkNoEstimateNoPremium,
  ArtworkWithEstimateAndPremium,
  ArtworkWithEstimateNoPremium,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/AuctionPartnerInfo"
import { ArtworkSidebarAuctionPartnerInfo as AuctionPartnerInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Artwork/Sidebar", module).add(
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
