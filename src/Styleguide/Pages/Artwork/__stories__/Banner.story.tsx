import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Banner } from "../Banner"

storiesOf("Styleguide/Artwork", module).add("Banner", () => {
  return (
    <Banner
      src="https://picsum.photos/110/110/?random"
      badge="In show"
      headline="Francesca DiMattio: Boucherouite"
      subHeadline="Salon 94"
    />
  )
})
