import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as auctionRoutes } from "../Auction/routes"
import { routes as collectRoutes } from "../Collect/routes"
import { routes as collect2Routes } from "../Collect2/routes"
import { routes as collectionsRoutes } from "../Collections/routes"
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
  .add("Collect", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collect"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collection", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/pablo-picasso-doves"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collections", () => {
    return (
      <MockRouter
        routes={collectionsRoutes}
        initialRoute="/collections"
        context={{}}
      />
    )
  })
  .add("Search Results", () => {
    return <MockRouter routes={searchRoutes} initialRoute="/search?term=andy" />
  })
