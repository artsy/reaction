import { storiesOf } from "@storybook/react"
import React from "react"
import { Gene } from "../Fixtures/Components"
import { StandardArticle } from "../Fixtures/Articles"
import { ToolTip } from "../ToolTip/ToolTip"
import { TooltipsDataLoader } from "../ToolTip/TooltipsDataLoader"
import { LinkWithTooltip } from "../ToolTip/LinkWithTooltip"

storiesOf("Publishing/ToolTips", module)
  .add("Artist: bio", () => {
    return (
      <div style={{ maxWidth: 580, margin: "350px auto 0 auto" }}>
        <TooltipsDataLoader article={StandardArticle}>
          <div>
            <LinkWithTooltip url="https://artsy.net/artist/fra-angelico">
              Fra Angelico
            </LinkWithTooltip>
          </div>
          <div>
            <LinkWithTooltip url="https://artsy.net/artist/judy-chicago">
              Judy Chicago
            </LinkWithTooltip>
          </div>
          <div>
            <LinkWithTooltip url="https://artsy.net/artist/alfred-stieglitz">
              Alfred Stieglitz
            </LinkWithTooltip>
          </div>
        </TooltipsDataLoader>
      </div>
    )
  })
  .add("Artist: market data", () => {
    return (
      <div style={{ maxWidth: 580, margin: "350px auto 0 auto" }}>
        <TooltipsDataLoader article={StandardArticle}>
          <div>
            <LinkWithTooltip
              url="https://artsy.net/artist/fra-angelico"
              showMarketData
            >
              Fra Angelico
            </LinkWithTooltip>
          </div>
          <div>
            <LinkWithTooltip
              url="https://artsy.net/artist/judy-chicago"
              showMarketData
            >
              Judy Chicago
            </LinkWithTooltip>
          </div>
          <div>
            <LinkWithTooltip
              url="https://artsy.net/artist/alfred-stieglitz"
              showMarketData
            >
              Alfred Stieglitz
            </LinkWithTooltip>
          </div>
        </TooltipsDataLoader>
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
