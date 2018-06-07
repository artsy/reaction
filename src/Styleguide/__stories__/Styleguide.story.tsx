import { storiesOf } from "@storybook/react"
import React from "react"
import { Artwork, Artist } from "../"
import { Theme } from "@artsy/palette"

storiesOf("Styleguide", module)
  .addDecorator(storyFn => {
    return <Theme>{storyFn()}</Theme>
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
