import { storiesOf } from "@storybook/react"
import React from "react"
import { Artwork, Artist } from "../"
import { Theme } from "../theme"

const stories = storiesOf("Styleguide", module)

stories
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
