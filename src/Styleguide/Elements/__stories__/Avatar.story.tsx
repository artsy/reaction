import { storiesOf } from "@storybook/react"
import React from "react"
import { Avatar } from "../Avatar"

storiesOf("Styleguide/Elements", module).add("Avatar", () => {
  return <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
})
