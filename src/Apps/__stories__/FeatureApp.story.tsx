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
  .add(
    "App (what-you-should-know-a-survey-course-on-modern-and-contemporary-art)",
    () => {
      return (
        <MockRouter
          routes={FeatureRoutes}
          initialRoute="/feature/what-you-should-know-a-survey-course-on-modern-and-contemporary-art"
        />
      )
    }
  )
  .add("App (in-the-studio-1717-troutman-street)", () => {
    return (
      <MockRouter
        routes={FeatureRoutes}
        initialRoute="/feature/in-the-studio-1717-troutman-street"
      />
    )
  })
