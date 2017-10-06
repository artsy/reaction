import { mount } from "enzyme"
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

import CanvasSlideshow from "../canvas/canvas_slideshow"
import CanvasText from "../canvas/canvas_text"
import CanvasVideo from "../canvas/canvas_video"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders the unit data", () => {
  const canvas = mount(<DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />)
  expect(canvas.html()).toMatch(UnitCanvasImage.disclaimer)
  expect(canvas.html()).toMatch(UnitCanvasImage.headline)
  expect(canvas.html()).toMatch(UnitCanvasImage.link.text)
  expect(canvas.html()).toMatch(UnitCanvasImage.link.url)
  expect(canvas.html()).toMatch(UnitCanvasImage.logo)
  expect(canvas.find(CanvasText).length).toBe(1)
  expect(canvas.find(CanvasSlideshow).length).toBe(0)
  expect(canvas.find(CanvasVideo).length).toBe(0)
})

it("renders the canvas in standard layout with image", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the canvas in standard layout with video", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the video component if standard layout with video", () => {
  const canvas = mount(<DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />)
  expect(canvas.find(CanvasVideo).length).toBe(1)
})

it("renders the canvas in overlay layout", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the canvas in slideshow layout", () => {
  const displayPanel = renderer.create(<DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />).toJSON()
  expect(displayPanel).toMatchSnapshot()
})

it("renders the slideshow component if slideshow layout", () => {
  const canvas = mount(<DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />)
  expect(canvas.find(CanvasSlideshow).length).toBe(1)
})
