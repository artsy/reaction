import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes/Confirm Bid", module)
  .add("Plain", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/shared-live-mocktion-k8s/bid2/nicole-won-hee-maloof-surrealism?bid=11000000"
      />
    )
  })
  .add("Pricing Transparency", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/shared-live-mocktion-k8s/bid2/nicole-won-hee-maloof-surrealism?bid=11000000&pt=1"
      />
    )
  })
