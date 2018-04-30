import { storiesOf } from "@storybook/react"
import React from "react"
import { Artists, Gene } from "../Fixtures/Components"
import { ToolTip } from "../ToolTip/ToolTip"

storiesOf("Publishing/ToolTips", module)
  .add("Artist: bio", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <ToolTip entity={Artists[0]} model="artist" />
        <ToolTip entity={Artists[1]} model="artist" />
        <ToolTip entity={Artists[2]} model="artist" />
        <ToolTip entity={Artists[3]} model="artist" />
      </div>
    )
  })
  .add("Artist: market data", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <ToolTip entity={Artists[0]} model="artist" showTestVariant />
        <ToolTip entity={Artists[1]} model="artist" showTestVariant />
        <ToolTip entity={Artists[2]} model="artist" showTestVariant />
        <ToolTip entity={Artists[3]} model="artist" showTestVariant />
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
