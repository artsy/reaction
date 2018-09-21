import { storiesOf } from "@storybook/react"
import * as React from "react"

import { ContextProvider } from "Artsy"
import { Contents } from "../Artist/MarketInsights"

function RenderMarketInsightsFor(artistID: string) {
  return (
    <ContextProvider>
      <Contents artistID={artistID} />
    </ContextProvider>
  )
}

storiesOf("Components/Artist/MarketInsights", module)
  .add("Pablo Picasso", () => RenderMarketInsightsFor("pablo-picasso"))
  .add("Andy Warhol", () => RenderMarketInsightsFor("andy-warhol"))
  .add("Damon Zucconi", () => RenderMarketInsightsFor("damon-zucconi"))
  .add("Huma Bhabha", () => RenderMarketInsightsFor("huma-bhabha"))
  .add("Robert Longo", () => RenderMarketInsightsFor("robert-longo"))
  .add("Carla Accardi", () => RenderMarketInsightsFor("carla-accardi"))
  .add("Armando Castro-Uribe (none)", () =>
    RenderMarketInsightsFor("armando-castro-uribe")
  )
