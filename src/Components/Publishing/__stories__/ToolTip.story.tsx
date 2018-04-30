import { storiesOf } from "@storybook/react"
import React from "react"
import { Artist, Gene } from "../Fixtures/Components"
import { ToolTip } from "../ToolTip/ToolTip"

storiesOf("Publishing/ToolTips", module)
  .add("Artist", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <ToolTip entity={Artist} model="artist" />
      </div>
    )
  })
  .add("Gene", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <ToolTip entity={Gene} model="gene" />
      </div>
    )
  })
