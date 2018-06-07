import { storiesOf } from "@storybook/react"
import React from "react"
import { Theme } from "../../theme"
import { withInfo } from "@storybook/addon-info"
import { Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add(
  "Tabs",
  withInfo(`

    Tabs

  `)(() => {
    return (
      <Theme>
        <Tabs labels={["Hello", "World"]} />
      </Theme>
    )
  })
)
