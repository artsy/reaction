import { storiesOf } from "@storybook/react"
import React from "react"

import { Tooltip } from "../Tooltip"
import { Help } from "../../Assets/Icons/Help"

function RenderTooltip(
  message: string,
  hoverAlign: string,
  hoverWidth?: number
) {
  return (
    <div style={{ padding: "20px 0px 0px 300px" }}>
      <Tooltip
        message={message}
        hoverAlign={hoverAlign}
        hoverWidth={hoverWidth}
      >
        <Help />
      </Tooltip>
    </div>
  )
}

storiesOf("Components/Tooltips", module)
  .add("Right aligned", () =>
    RenderTooltip("this is a right aligned tooltip", "right")
  )
  .add("Left aligned", () =>
    RenderTooltip("this is a left aligned tooltip", "left", 200)
  )
