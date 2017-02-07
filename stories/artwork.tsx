import * as React from "react"
import { storiesOf, action } from "@kadira/storybook"
import { Artwork } from "../src/artwork"

storiesOf("Artwork", Artwork)
  .add("Hello World", () => {
    return <Artwork />
  })
