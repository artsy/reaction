import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../../fixtures/components"
import Slide from "../slide"

it("renders properly", () => {
  const onClose = jest.fn()
  const viewer = renderer.create(<Slide section={Images[0]} show onClose={onClose} />).toJSON()
  expect(viewer).toMatchSnapshot()
})
