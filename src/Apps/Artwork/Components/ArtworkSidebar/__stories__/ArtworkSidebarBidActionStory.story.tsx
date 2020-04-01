import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  NotIDVedUser,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { ArtworkSidebarBidAction as BidAction } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import { merge as _merge } from "lodash"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"

const merge: (...args: object[]) => any = _merge

storiesOf("Apps/Artwork/Components/Sidebar", module).add("BidAction", () => {
  return (
    <React.Fragment>
      {/* Auction in preview state */}
      <Section title="Auction Preview / Bidder not registered">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, NotRegisteredToBid)}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Auction preview / Bidder pending approval">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, BidderPendingApproval)}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Auction preview / Registed bidder">
        <BidAction
          artwork={merge({}, ArtworkFromAuctionPreview, RegisteredBidder)}
          me={NotIDVedUser as any}
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
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction / Closed Registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Open registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationOpen,
            RegistedBidderWithBids
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Timed Auction or Prebidding for Live auction /  Closed Registration / Registered bidder with bids">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromTimedAuctionRegistrationClosed,
            RegistedBidderWithBids
          )}
          me={NotIDVedUser as any}
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
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder not registered">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            NotRegisteredToBid
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Live auction / Open registration / Bidder pending approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Live auction / Closed registration / Bidder pending approval">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            BidderPendingApproval
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Live auction / Open registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationOpen,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>
      <Section title="Live auction / Closed registration / Registered Bidder">
        <BidAction
          artwork={merge(
            {},
            ArtworkFromLiveAuctionRegistrationClosed,
            RegisteredBidder
          )}
          me={NotIDVedUser as any}
        />
      </Section>

      {/* Auction in Closed */}
      <Section title="Auction closed">
        <BidAction
          artwork={merge({}, ArtworkFromClosedAuction, RegisteredBidder)}
          me={NotIDVedUser as any}
        />
      </Section>
    </React.Fragment>
  )
})
