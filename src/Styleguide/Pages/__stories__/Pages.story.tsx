import { storiesOf } from "@storybook/react"
import React from "react"
import { Artist, Artwork } from "../../"

storiesOf("Styleguide/Pages", module)
  .add("Static Artwork Page", () => {
    return <Artwork />
  })
  .add("Static Artist Page", () => {
    return <Artist />
  })
