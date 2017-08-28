import * as React from "react"
import * as renderer from "react-test-renderer"
import Articles from "../../../fixtures/articles"
import FullscreenViewer from "../fullscreen_viewer"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})

it("renders properly", () => {
  const onClose = jest.fn()
  const viewer = renderer.create(<FullscreenViewer sections={Articles[1].sections} show onClose={onClose} />).toJSON()
  expect(viewer).toMatchSnapshot()
})
