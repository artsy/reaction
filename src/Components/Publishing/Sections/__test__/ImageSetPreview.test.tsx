import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ImageSetFull, ImageSetMini } from "../../Fixtures/Components"
import { ImageSetPreview } from "../ImageSetPreview"

it("renders a full image set properly", () => {
  const imageset = renderer.create(<ImageSetPreview section={ImageSetFull} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
it("renders a mini image set properly", () => {
  const imageset = renderer.create(<ImageSetPreview section={ImageSetMini} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
