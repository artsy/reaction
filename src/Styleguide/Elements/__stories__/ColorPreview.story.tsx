import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ColorPreview } from "../../Utils/ColorPreview"

storiesOf("Styleguide/Elements", module).add("Colors", () => {
  return <ColorPreview />
})
