import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { CurrentBidInfo } from "Styleguide/Pages/Artwork/Sidebar/CurrentBidInfo"
import {
  ClosedAuctionArtwork,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetWithBids,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/CurrentBidInfo"
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
    </React.Fragment>
  )
})
