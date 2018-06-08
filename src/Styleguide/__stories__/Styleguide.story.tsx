import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Artwork, Artist } from "../"
import { ColorPreview } from "../Utils/ColorPreview"

storiesOf("Styleguide", module)
  .add("Colors", () => {
    return (
      <ColorPreview />
    )
  })
  .add("Static Artwork Page", () => {
    return <Artwork />
  })
  .add("Static Artist Page", () => {
    return <Artist />
  })
