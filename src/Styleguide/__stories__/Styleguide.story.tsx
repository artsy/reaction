import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Artwork, Artist } from "../"

storiesOf("Styleguide", module)
  .add("Static Artwork Page", () => {
    return <Artwork />
  })
  .add("Static Artist Page", () => {
    return <Artist />
  })
