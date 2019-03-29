import { Box } from "@artsy/palette"
import { ArtistRecommendations } from "Apps/Artist/Components/ArtistRecommendations"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as artistRoutes } from "../Artist/routes"

storiesOf("Apps/Artist Page", module)
  .add("Artist Page", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Artist Recommendations", () => {
    return (
      <Box m={3}>
        <ArtistRecommendations artist={artistWithRecommendations} />
      </Box>
    )
  })

const artistWithRecommendations = {
  " $refType": null,
  name: "Pablo Picasso",
}
