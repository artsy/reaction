import { storiesOf } from "@storybook/react"
import React from "react"
import { Artwork, Artist } from "../"
import { Theme } from "../theme"

storiesOf("Styleguide", module)
  .add("Static Artwork Page", () => {
    return (
      <Theme>
        <Artwork />
      </Theme>
    )
  })
  .add("Static Artist Page", () => {
    return (
      <Theme>
        <Artist />
      </Theme>
    )
  })
