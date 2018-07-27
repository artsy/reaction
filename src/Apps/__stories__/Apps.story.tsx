import { storiesOf } from "@storybook/react"
import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as artworkRoutes } from "../Artwork/routes"

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
        initialRoute="/artist/pablo-picasso"
        initialState={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
