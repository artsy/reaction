import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes/Confirm Bid", module)
  .add("Plain", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/phillips-editions-and-works-on-paper-5/bid2/jean-dubuffet-lenfle-chic-i-the-inflated-snob-i"
      />
    )
  })
  .add("High selected bid in query string", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/phillips-editions-and-works-on-paper-5/bid2/jean-dubuffet-lenfle-chic-i-the-inflated-snob-i?bid=110000000000"
      />
    )
  })
  .add("Pricing Transparency", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/phillips-editions-and-works-on-paper-5/bid2/jean-dubuffet-lenfle-chic-i-the-inflated-snob-i?&pt=1"
      />
    )
  })
