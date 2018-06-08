import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { withInfo } from "@storybook/addon-info"
import { Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add(
  "Tabs",
  withInfo(`

    Tabs

  `)(() => {
    return <Tabs labels={["Hello", "World"]} />
  })
)
