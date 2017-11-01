import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Campaign, UnitPanel, UnitPanelVideo } from "../../Fixtures/Components"
import { DisplayPanel } from "../DisplayPanel"

it("renders the display panel with an image", () => {
  const displayPanel = renderer.create(<DisplayPanel unit={UnitPanel} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the display panel with video", () => {
  const displayPanel = renderer.create(<DisplayPanel unit={UnitPanelVideo} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})
