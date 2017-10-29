import "jest-styled-components"
import React from "react"
import * as renderer from "react-test-renderer"
import { Campaign, UnitPanel } from "../../Fixtures/Components"
import { DisplayPanel } from "../DisplayPanel"

it("renders the display panel", () => {
  const displayPanel = renderer.create(<DisplayPanel unit={UnitPanel} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})
