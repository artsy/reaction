import React from "react"
import { storiesOf } from "@storybook/react"
import { Banner } from "../Banner"
import { Theme } from "../../theme"

storiesOf("Styleguide/Artwork", module).add("Banner", () => {
  return (
    <Theme>
      <Banner
        src="https://picsum.photos/110/110/?random"
        badge="In show"
        headline="Francesca DiMattio: Boucherouite"
        subHeadline="Salon 94"
      />
    </Theme>
  )
})
