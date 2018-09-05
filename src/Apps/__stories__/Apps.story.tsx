import { storiesOf } from "@storybook/react"
import { StorybooksRouter } from "Artsy/Router"
import React from "react"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as artworkRoutes } from "../Artwork/routes"
import { routes as collectRoutes } from "../Collect/routes"

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
        initialRoute="/artist/walter-gropius"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collect Page", () => {
    return (
      <StorybooksRouter
        routes={collectRoutes}
        initialRoute="/collect2"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
