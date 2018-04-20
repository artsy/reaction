import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../../Fixtures/Components"
import { Slide } from "../Slide"

it("renders properly", () => {
  const onClose = jest.fn()
  const viewer = renderer
    .create(<Slide section={Images[0]} show onClose={onClose} />)
    .toJSON()
  expect(viewer).toMatchSnapshot()
})
