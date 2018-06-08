import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Gallery } from "../Gallery"

storiesOf("Styleguide/Artwork", module).add("Gallery", () => {
  return (
    <Gallery
      src="https://picsum.photos/110/110/?random"
      headline="Salon 94"
      subHeadline="New York, London, Beijing, Hong Kong"
    />
  )
})
