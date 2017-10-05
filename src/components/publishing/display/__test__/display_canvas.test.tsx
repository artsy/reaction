import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import {
  Campaign,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasVideo,
} from "../../fixtures/components"
import DisplayCanvas from "../canvas/index"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders the canvas in standard layout with image", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the canvas in standard layout with video", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the canvas in overlay layout", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the canvas in slideshow layout", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})
