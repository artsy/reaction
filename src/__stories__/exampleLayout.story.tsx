import { storiesOf } from "@storybook/react"
import React from "react"

storiesOf("Core/Tokens", module)
  .add("Color")
  .add("Typography")
  .add("Spacing")

storiesOf("Core/Elements", module)
  .add("Alert Banner")
  .add("Avatar")
  .add("Buttons")
  .add("Blocks")
  .add("Grid")
  .add("Icons")
  .add("Inputs")
  .add("Selects")
  .add("Pagination")
  .add("Nagivation")

storiesOf("Core/Components", module).add("placeholder")

storiesOf("Partner", module).add("placeholder")

storiesOf("Collection", module).add("placeholder")
