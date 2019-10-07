import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes", module)
  .add("Register", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction-registration/shared-live-mocktion-k8s"
      />
    )
  })
  .add("Bid", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction/shared-live-mocktion-k8s/bid/karen-halverson-painting?bid=65000"
      />
    )
  })
