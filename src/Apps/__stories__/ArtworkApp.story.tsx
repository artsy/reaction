import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as artworkRoutes } from "../Artwork/routes"

storiesOf("Apps/Artwork Page", module)
  .add("Default", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-femme-assise-dans-un-fauteuil-tresse"
      />
    )
  })
  .add("Open Auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/david-hockney-diptychon-3"
      />
    )
  })
  .add("Closed Auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/victor-vasarely-folkokta-4"
      />
    )
  })
  .add("Fair", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/lucio-fontana-concetto-spaziale-attese-139"
      />
    )
  })
  .add("Partner Show (Gallery)", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/victor-vasarely-darac-ii"
      />
    )
  })
