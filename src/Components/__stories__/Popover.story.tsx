import { storiesOf } from "@storybook/react"
import React from "react"

import { Popover } from "../Popover"

storiesOf("Components/Popover", module).add("Popover", () => (
  <div style={{ padding: "20px" }}>
    <Popover placement="right">Post to Facebook</Popover>
    <Popover placement="top">Post to Facebook</Popover>
    <Popover placement="left">Post to Facebook</Popover>
    <Popover placement="bottom">Post to Facebook</Popover>
  </div>
))
