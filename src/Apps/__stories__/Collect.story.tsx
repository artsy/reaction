import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as collect2Routes } from "../Collect2/routes"

storiesOf("Apps/Collect", module)
  .add("Collect", () => {
    return <MockRouter routes={collect2Routes} initialRoute="/collect" />
  })
  .add("Collections", () => {
    return <MockRouter routes={collect2Routes} initialRoute="/collections" />
  })
  .add("Collection", () => {
    return (
      <MockRouter
        routes={collect2Routes}
        initialRoute="/collection/abstract-expressionism-works-on-paper"
      />
    )
  })
