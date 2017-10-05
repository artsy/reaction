import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Campaign, UnitPanel } from "../../fixtures/components"
import DisplayPanel from "../display_panel"

it("renders the display panel", () => {
  const displayPanel = renderer.create(<DisplayPanel unit={UnitPanel} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})
