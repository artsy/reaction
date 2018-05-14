import { storiesOf } from "@storybook/react"
import React from "react"
import { TooltipsData } from "../ToolTip/TooltipsDataLoader"
import { LinkWithTooltip } from "../ToolTip/LinkWithTooltip"
import { StandardArticle } from "../Fixtures/Articles"
import { ContextProvider } from "../../Artsy"

storiesOf("Publishing/ToolTips", module)
  .add("Artist: bio", () => {
    return (
      <div style={{ maxWidth: 580, margin: "350px auto 0 auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
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
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
  .add("Artist: market data", () => {
    return (
      <div style={{ maxWidth: 580, margin: "350px auto 0 auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
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
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
  .add("Gene", () => {
    return (
      <div style={{ maxWidth: 580, margin: "350px auto" }}>
        <TooltipsData article={StandardArticle}>
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
        </TooltipsData>
      </div>
    )
  })
