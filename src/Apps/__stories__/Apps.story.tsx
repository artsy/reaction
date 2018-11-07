import { storiesOf } from "@storybook/react"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as artworkRoutes } from "../Artwork/routes"
import { routes as collectRoutes } from "../Collect/routes"
import { routes as collectionsRoutes } from "../Collections/routes"

storiesOf("Apps", module)
  .add("Artwork Page", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-femme-assise-dans-un-fauteuil-tresse"
      />
    )
  })
  .add("Artist Page", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso/auction-results"
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
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collect?acquireable=true"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collection Page", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/street-art-now"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collections Page", () => {
    return (
      <MockRouter
        routes={collectionsRoutes}
        initialRoute="/collections"
        context={{}}
      />
    )
  })
