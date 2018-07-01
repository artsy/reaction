import { storiesOf } from "@storybook/react"
import { Artist } from "Apps/Artist"
import { Artwork } from "Apps/Artwork"
import React from "react"

storiesOf("Apps", module)
  .add("Artwork Page", () => {
    return <Artwork />
  })
  .add("Artist Page", () => {
    return <Artist />
  })
