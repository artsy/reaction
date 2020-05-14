import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as FeatureRoutes } from "Apps/Feature/routes"

storiesOf("Apps/Feature", module).add("App", () => {
  return (
    <MockRouter
      routes={FeatureRoutes}
      initialRoute="/feature/alserkal-art-week"
    />
  )
})
