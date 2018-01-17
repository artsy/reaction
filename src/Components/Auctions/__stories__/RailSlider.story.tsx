import { storiesOf } from "@storybook/react"
import React from "react"

import { RailSlider } from "../RailSlider"

storiesOf("Auctions/RailSlider", module).add("Horizontal Rail", () => {
  return <RailSlider />
})
