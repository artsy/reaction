import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkSidebarBidAction as BidAction } from "Styleguide/Pages/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import {
  ArtworkPreviewAuction,
  BidderPendingApproval,
  NotRegisteredToBid,
  RegistedBidder,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/BidAction"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("BidAction", () => {
  return (
    <React.Fragment>
      <Section title="Preview Auction Not registed bidder">
        <BidAction artwork={ArtworkPreviewAuction} me={NotRegisteredToBid} />
      </Section>
      <Section title="Preview Auction Bidder pending approval">
        <BidAction artwork={ArtworkPreviewAuction} me={BidderPendingApproval} />
      </Section>
      <Section title="Preview Auction Bidder approved">
        <BidAction artwork={ArtworkPreviewAuction} me={RegistedBidder} />
      </Section>
    </React.Fragment>
  )
})
