import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
} from "Apps/__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { ArtworkSidebarBidAction as BidAction } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import { merge as _merge } from "lodash"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

const merge: (...args: object[]) => any = _merge

storiesOf("Styleguide/Artwork/Sidebar", module).add("BidAction", () => {
  return (
    <React.Fragment>
      {/* Auction in preview state */}
      <Section title="Auction Preview / Bidder not registered">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, NotRegisteredToBid)}
        />
      </Section>
      <Section title="Auction preview / Bidder pending approval">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, BidderPendingApproval)}
        />
      </Section>
      <Section title="Auction preview / Registed bidder">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, RegisteredBidder)}
        />
      </Section>

      {/* Auction in Open state and live bidding is not started */}
      <Section title="Timed Auction or Prebidding for Live auction / Open registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegisteredBidder
          )}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegisteredBidder
          )}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegistedBidderWithBids
          )}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegistedBidderWithBids
          )}
        />
      </Section>

      {/* Auction in Open state and live bidding is in progress */}
      <Section title="Live auction / Open registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            NotRegisteredToBid
          )}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
        />
      </Section>
      <Section title="Live auction / Open registration / Bidder pending approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            BidderPendingApproval
          )}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder pending approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            BidderPendingApproval
          )}
        />
      </Section>
      <Section title="Live auction / Open registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            RegisteredBidder
          )}
        />
      </Section>
      <Section title="Live auction / Closed registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            RegisteredBidder
          )}
        />
      </Section>

      {/* Auction in Closed */}
      <Section title="Auction closed">
        <BidAction
          artwork={merge({}, ArtworkFromClosedAuction, RegisteredBidder)}
        />
      </Section>
    </React.Fragment>
  )
})
