import { storiesOf } from "@storybook/react"
import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as artworkRoutes } from "../Artwork/routes"
import { routes as orderRoutes } from "../Order/routes"

storiesOf("Apps", module)
  .add("Artwork Page", () => {
    return (
      <StorybooksRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-david-et-bethsabee"
      />
    )
  })
  .add("Artist Page", () => {
    return (
      <StorybooksRouter
        routes={artistRoutes}
        initialRoute="/artist2/andy-warhol"
        initialState={{ mediator: { trigger: x => x } }}
      />
    )
  })
  .add("Order Page", () => (
    <StorybooksRouter routes={orderRoutes} initialRoute="/order2/1234" />
  ))
