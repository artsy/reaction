import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { collectRoutes } from "../Collect2/collectRoutes"

storiesOf("Apps/Collect", module)
  .add("Collect", () => {
    return <MockRouter routes={collectRoutes} initialRoute="/collect" />
  })
  .add("Collections", () => {
    return <MockRouter routes={collectRoutes} initialRoute="/collections" />
  })
  .add("Collection", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/abstract-expressionism-works-on-paper"
      />
    )
  })
  .add("Collection with Hub rails", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/street-art-now"
      />
    )
  })
