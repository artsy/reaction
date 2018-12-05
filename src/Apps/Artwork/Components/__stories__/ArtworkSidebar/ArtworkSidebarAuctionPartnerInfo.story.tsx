import {
  ArtworkAuctionPreview,
  ArtworkClosedAuction,
  ArtworkNoEstimateNoPremium,
  ArtworkWithEstimateAndPremium,
  ArtworkWithEstimateNoPremium,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarAuctionPartnerInfo as AuctionPartnerInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add(
  "AuctionPartnerInfo",
  () => {
    return (
      <React.Fragment>
        <Section title="Auction name only">
          <AuctionPartnerInfo artwork={ArtworkNoEstimateNoPremium as any} />
        </Section>
        <Section title="Artwork with estimate">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateNoPremium as any} />
        </Section>
        <Section title="Artwork with estimate and buyer's premium">
          <AuctionPartnerInfo artwork={ArtworkWithEstimateAndPremium as any} />
        </Section>
        <Section title="Closed Auction">
          <AuctionPartnerInfo artwork={ArtworkClosedAuction as any} />
        </Section>
        <Section title="Auction in preview">
          <AuctionPartnerInfo artwork={ArtworkAuctionPreview as any} />
        </Section>
      </React.Fragment>
    )
  }
)
