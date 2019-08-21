import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as searchRoutes } from "../Search/routes"

storiesOf("Apps", module).add("Search Results", () => {
  return <MockRouter routes={searchRoutes} initialRoute="/search?term=andy" />
})
