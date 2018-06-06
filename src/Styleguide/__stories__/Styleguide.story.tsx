import { storiesOf } from "@storybook/react"
import React from "react"
import { Styleguide } from "../"

const stories = storiesOf("Styleguide", module)

stories
  .add("Static Artwork Page", () => {
    return <Styleguide />
  })
  .add("Static Artist Page", () => {
    return <Styleguide />
  })
