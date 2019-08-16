import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as auctionRoutes } from "../Auction/routes"

storiesOf("Apps", module).add("Auction Registration", () => {
  return (
    <MockRouter
      routes={auctionRoutes}
      initialRoute="/auction-registration2/weekly-mocktion"
    />
  )
})
