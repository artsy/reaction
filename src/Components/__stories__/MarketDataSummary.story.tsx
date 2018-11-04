import { storiesOf } from "@storybook/react"
import * as React from "react"

import { SystemContextProvider } from "Artsy/SystemContext"
import { Contents } from "../Artist/MarketDataSummary"

function RenderMarketDataSummaryFor(artistID: string) {
  return (
    <SystemContextProvider>
      <Contents artistID={artistID} />
    </SystemContextProvider>
  )
}

storiesOf("Components/Artist/MarketDataSummary", module)
  .add("Pablo Picasso", () => RenderMarketDataSummaryFor("pablo-picasso"))
  .add("Andy Warhol", () => RenderMarketDataSummaryFor("andy-warhol"))
  .add("Damon Zucconi", () => RenderMarketDataSummaryFor("damon-zucconi"))
  .add("Huma Bhabha", () => RenderMarketDataSummaryFor("huma-bhabha"))
  .add("Robert Longo", () => RenderMarketDataSummaryFor("robert-longo"))
  .add("Carla Accardi", () => RenderMarketDataSummaryFor("carla-accardi"))
  .add("Armando Castro-Uribe (none)", () =>
    RenderMarketDataSummaryFor("armando-castro-uribe")
  )
