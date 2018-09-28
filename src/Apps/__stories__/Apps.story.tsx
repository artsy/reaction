import { storiesOf } from "@storybook/react"
import { ClientRouter } from "Artsy/Router/Components/ClientRouter"
import React from "react"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as artworkRoutes } from "../Artwork/routes"
import { routes as collectRoutes } from "../Collect/routes"

storiesOf("Apps", module)
  .add("Artwork Page", () => {
    return (
      <ClientRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-david-et-bethsabee"
      />
    )
  })
  .add("Artist Page", () => {
    return (
      <ClientRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso"
        context={{ mediator: { trigger: x => x } }}
      />
    )
  })
  .add("Collect Page", () => {
    return (
      <ClientRouter
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
