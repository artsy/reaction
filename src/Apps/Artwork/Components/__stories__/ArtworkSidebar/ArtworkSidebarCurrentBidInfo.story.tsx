import {
  ClosedAuctionArtwork,
  LiveAuctionInProgeress,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveMetWithMyLoosingBid,
  OpenAuctionReserveMetWithMyWinningBid,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetWithBids,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/CurrentBidInfo"
import { ArtworkSidebarCurrentBidInfo as CurrentBidInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("CurrentBidInfo", () => {
  return (
    <React.Fragment>
      <Section title="Closed auction">
        <CurrentBidInfo artwork={ClosedAuctionArtwork} />
      </Section>
      <Section title="Open auction no reserve no bids">
        <CurrentBidInfo artwork={OpenAuctionNoReserveNoBids} />
      </Section>
      <Section title="Open auction no reserve with bids">
        <CurrentBidInfo artwork={OpenAuctionNoReserveWithBids} />
      </Section>
      <Section title="Open auction with reserve and no bids">
        <CurrentBidInfo artwork={OpenAuctionReserveNoBids} />
      </Section>
      <Section title="Open auction reserve not met with bids">
        <CurrentBidInfo artwork={OpenAuctionReserveNotMetWithBids} />
      </Section>
      <Section title="Open auction reserve met with bids">
        <CurrentBidInfo artwork={OpenAuctionReserveMetWithBids} />
      </Section>
      <Section title="Open auction with my bid winning">
        <CurrentBidInfo artwork={OpenAuctionReserveMetWithMyWinningBid} />
      </Section>
      <Section title="Open auction with my bid loosing">
        <CurrentBidInfo artwork={OpenAuctionReserveMetWithMyLoosingBid} />
      </Section>
      <Section title="Live auction in progress">
        <CurrentBidInfo artwork={LiveAuctionInProgeress} />
      </Section>
    </React.Fragment>
  )
})
