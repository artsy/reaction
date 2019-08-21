import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Auction/Routes", module).add("Register", () => {
  return (
    <MockRouter
      routes={auctionRoutes}
      initialRoute="/auction-registration2/weekly-mocktion"
    />
  )
})
