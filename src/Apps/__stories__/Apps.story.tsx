import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as auctionRoutes } from "../Auction/routes"
import { routes as collect2Routes } from "../Collect2/routes"
import { routes as searchRoutes } from "../Search/routes"

storiesOf("Apps", module)
  .add("Auction Registration", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction-registration2/weekly-mocktion"
      />
    )
  })
  .add("Collect2", () => {
    return <MockRouter routes={collect2Routes} initialRoute="/collect" />
  })
  .add("Collections2", () => {
    return <MockRouter routes={collect2Routes} initialRoute="/collections" />
  })
  .add("Collection2", () => {
    return (
      <MockRouter
        routes={collect2Routes}
        initialRoute="/collection/abstract-expressionism-works-on-paper"
      />
    )
  })
  .add("Search Results", () => {
    return <MockRouter routes={searchRoutes} initialRoute="/search?term=andy" />
  })
