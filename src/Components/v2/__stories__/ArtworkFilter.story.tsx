import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkFilterQueryRenderer } from "../ArtworkFilter"

storiesOf("Components/ArtworkFilter", module).add("ArtworkFilter", () => {
  return <ArtworkFilterQueryRenderer />
})
