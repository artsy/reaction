import { storiesOf } from "@storybook/react"
import React from "react"
import { TooltipsData } from "Components/Publishing/ToolTip/TooltipsDataLoader"
import { LinkWithTooltip } from "Components/Publishing/ToolTip/LinkWithTooltip"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import { ContextProvider } from "Components/Artsy"

storiesOf("Publishing/ToolTips/Artist", module)
  .add("With Bio", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto 0 auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
            <p>
              <LinkWithTooltip url="https://artsy.net/artist/fra-angelico">
                Fra Angelico
              </LinkWithTooltip>
              {`, `}
              <LinkWithTooltip url="https://artsy.net/artist/judy-chicago">
                Judy Chicago
              </LinkWithTooltip>
              {`, and `}
              <LinkWithTooltip url="https://artsy.net/artist/alfred-stieglitz">
                Alfred Stieglitz
              </LinkWithTooltip>
            </p>
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
  .add("With Market data", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto 0 auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
            <p>
              <LinkWithTooltip
                url="https://artsy.net/artist/fra-angelico"
                showMarketData
              >
                Fra Angelico
              </LinkWithTooltip>
              {`, `}
              <LinkWithTooltip
                url="https://artsy.net/artist/judy-chicago"
                showMarketData
              >
                Judy Chicago
              </LinkWithTooltip>
              {`, and `}
              <LinkWithTooltip
                url="https://artsy.net/artist/alfred-stieglitz"
                showMarketData
              >
                Alfred Stieglitz
              </LinkWithTooltip>
            </p>
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
storiesOf("Publishing/ToolTips/Gene", module).add("Gene", () => {
  return (
    <div style={{ maxWidth: 580, margin: "50px auto" }}>
      <ContextProvider>
        <TooltipsData article={StandardArticle}>
          <p>
            <LinkWithTooltip url="https://artsy.net/gene/art-nouveau">
              Art Nouveau
            </LinkWithTooltip>
            {` and `}
            <LinkWithTooltip url="https://artsy.net/gene/art-deco">
              Art Deco
            </LinkWithTooltip>
          </p>
        </TooltipsData>
      </ContextProvider>
    </div>
  )
})
