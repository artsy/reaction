import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as artistRoutes } from "../Artist/routes"

storiesOf("Apps/Artist", module).add("Artist", () => {
  return (
    <MockRouter
      routes={artistRoutes}
      initialRoute="/artist/pablo-picasso?medium=prints&at_auction=true"
      context={{
        mediator: {
          trigger: x => x,
        },
      }}
    />
  )
})
