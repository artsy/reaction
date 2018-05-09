import { storiesOf } from "@storybook/react"
import React from "react"
import { TooltipsDataLoader } from "../ToolTip/TooltipsDataLoader"
import { LinkWithTooltip } from "../ToolTip/LinkWithTooltip"
import { StandardArticle } from "../Fixtures/Articles"

storiesOf("Publishing/ToolTips/Artist", module)
  .add("With Bio", () => {
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
  .add("With Market data", () => {
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

storiesOf("Publishing/ToolTips/Gene", module).add("Gene", () => {
  return (
    <div style={{ maxWidth: 580, margin: "350px auto" }}>
      <TooltipsDataLoader article={StandardArticle}>
        <div>
          <LinkWithTooltip url="https://artsy.net/gene/art-nouveau">
            Art Nouveau
          </LinkWithTooltip>
        </div>
        <div>
          <LinkWithTooltip url="https://artsy.net/gene/art-deco">
            Art Deco
          </LinkWithTooltip>
        </div>
      </TooltipsDataLoader>
    </div>
  )
})
