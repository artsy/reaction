import { shallow } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../../Fixtures/Components"
import { FullscreenViewer } from "../FullscreenViewer"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
it("renders properly", () => {
  const onClose = jest.fn()
  const viewer = renderer.create(<FullscreenViewer images={Images} show onClose={onClose} />).toJSON()
  expect(viewer).toMatchSnapshot()
})

it("closes the viewer on ESC keydown", () => {
  const onClose = jest.fn()
  const viewer = shallow(<FullscreenViewer images={Images} show onClose={onClose} />)
  viewer.simulate("keyDown", { keyCode: 27 })
  expect(onClose).toBeCalled()
})
