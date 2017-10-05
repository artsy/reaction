import { storiesOf } from "@storybook/react"
import * as React from "react"
import DisplayPanel from "../display/display_panel"
import { Campaign, UnitPanel } from "../fixtures/components"

storiesOf("Publishing/Display", module).add("Panel", () => {
  return <DisplayPanel unit={UnitPanel} campaign={Campaign} />
})
