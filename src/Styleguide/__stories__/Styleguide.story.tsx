import { storiesOf } from "@storybook/react"
import React from "react"
import { Artwork, Artist } from "../"
import { Theme } from "../theme"
import { ColorPreview } from "../Utils/ColorPreview"

storiesOf("Styleguide", module)
  .add("Colors", () => {
    return (
      <Theme>
        <ColorPreview />
      </Theme>
    )
  })
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
