import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as FeatureRoutes } from "Apps/Feature/routes"

storiesOf("Apps/Feature", module)
  .add("App (communities-test)", () => {
    return (
      <MockRouter
        routes={FeatureRoutes}
        initialRoute="/feature/communities-test"
      />
    )
  })
  .add("App (features)", () => {
    return (
      <MockRouter routes={FeatureRoutes} initialRoute="/feature/features" />
    )
  })
