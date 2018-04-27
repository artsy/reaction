import { storiesOf } from "@storybook/react"
import React from "react"
import { Gene } from "../Fixtures/Components"
import { ToolTip } from "../ToolTip/ToolTip"

storiesOf("Publishing/ToolTips", module).add("Gene", () => {
  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <ToolTip entity={Gene} model="gene" />
    </div>
  )
})
