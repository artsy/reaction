import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as auctionRoutes } from "../Auction/routes"
import { routes as collectRoutes } from "../Collect/routes"
import { routes as collectionsRoutes } from "../Collections/routes"
import { routes as searchRoutes } from "../Search/routes"

storiesOf("Apps", module)
  .add("Auction Registration", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute="/auction-registration/yuki-contemporary-art-july-22th"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
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
