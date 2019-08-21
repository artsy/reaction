import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes", module).add("Bid", () => {
  return (
    <MockRouter
      routes={auctionRoutes}
      initialRoute="/auction/weekly-mocktion/bid/italy-tuscany-14th-century-self-portrait"
    />
  )
})
