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
  .add("Inquireable", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/jerry-freedner-approaching-storm"
      />
    )
  })
  .add("Open Auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/rembrandt-van-rijn-man-crying-out-bust-directed-three-quarter-to-the-left"
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
  .add("Cultural Maker Artwork", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/american-18th-century-lady-wearing-a-large-white-cap"
      />
    )
  })
  .add("Tall image", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/nissa-kauppila-wu-ti-35-degrees-45-35-dot-5-n-81-degrees-21-16-dot-2-w"
      />
    )
  })
  .add("Wide image", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/josef-albers-interlinear-n-65"
      />
    )
  })
  .add("Related Grids (but no content)", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/robert-rauschenberg-and-susan-weil-female-figure"
      />
    )
  })
  .add("Artwork with multiple artists", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/andy-warhol-twenty-years-1977-signed-slash-inscribed-by-leo-exhibition-catalogue-leo-castelli-gallery-1st-edition"
      />
    )
  })
