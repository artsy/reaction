import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkSidebarBidAction as BidAction } from "Styleguide/Pages/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  NotRegisteredToBid,
  RegistedBidder,
  RegistedBidderWithBids,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/BidAction"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("BidAction", () => {
  return (
    <React.Fragment>
      {/* Auction in preview state */}
      <Section title="Auction Preview / Bidder not registered">
        <BidAction
          artwork={ArtworkFromAuctionPreview}
          me={NotRegisteredToBid}
        />
      </Section>
      <Section title="Auction preview / Bidder pending approval">
        <BidAction
          artwork={ArtworkFromAuctionPreview}
          me={BidderPendingApproval}
        />
      </Section>
      <Section title="Auction preview / Registed bidder">
        <BidAction artwork={ArtworkFromAuctionPreview} me={RegistedBidder} />
      </Section>

      {/* Auction in Open state and live bidding is not started */}
      <Section title="Timed Auction or Prebidding for Live auction / Open registration / Bidder not registered">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationOpen}
          me={NotRegisteredToBid}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Bidder not registered">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationClosed}
          me={NotRegisteredToBid}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationOpen}
          me={RegistedBidder}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationClosed}
          me={RegistedBidder}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder with bids">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationOpen}
          me={RegistedBidderWithBids}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder with bids">
        <BidAction
          artwork={ArtworkFromTimedAuctionRegistrationClosed}
          me={RegistedBidderWithBids}
        />
      </Section>

      {/* Auction in Open state and live bidding is in progress */}
      <Section title="Live auction / Open registration / Bidder not registered">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationOpen}
          me={NotRegisteredToBid}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder not registered">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationClosed}
          me={NotRegisteredToBid}
        />
      </Section>
      <Section title="Live auction / Open registration / Bidder pending approval">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationOpen}
          me={BidderPendingApproval}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder pending approval">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationClosed}
          me={BidderPendingApproval}
        />
      </Section>
      <Section title="Live auction / Open registration / Registered Bidder">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationOpen}
          me={RegistedBidder}
        />
      </Section>
      <Section title="Live auction / Closed registration / Registered Bidder">
        <BidAction
          artwork={ArtworkFromLiveAuctionRegistrationClosed}
          me={RegistedBidder}
        />
      </Section>

      {/* Auction in Closed */}
      <Section title="Auction closed">
        <BidAction artwork={ArtworkFromClosedAuction} me={RegistedBidder} />
      </Section>
    </React.Fragment>
  )
})
