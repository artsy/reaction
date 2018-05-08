import { storiesOf } from "@storybook/react"
import React from "react"
import { Artists } from "../Fixtures/Components"
import { ToolTip } from "../ToolTip/ToolTip"
import { TooltipsDataLoader } from "../ToolTip/TooltipsDataLoader"
import { LinkWithTooltip } from "../ToolTip/LinkWithTooltip"
import { StandardArticle } from "../Fixtures/Articles"

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
        <ToolTip entity={Artists[0]} model="artist" showMarketData />
        <ToolTip entity={Artists[1]} model="artist" showMarketData />
        <ToolTip entity={Artists[2]} model="artist" showMarketData />
        <ToolTip entity={Artists[3]} model="artist" showMarketData />
      </div>
    )
  })
  .add("Gene", () => {
    return (
      <div style={{ maxWidth: 580, margin: "250px auto" }}>
        <TooltipsDataLoader article={StandardArticle}>
          <div>
            <LinkWithTooltip
              url="https://artsy.net/gene/art-nouveau"
              node={"p"}
            >
              art-nouveau
            </LinkWithTooltip>
          </div>
        </TooltipsDataLoader>
      </div>
    )
  })
