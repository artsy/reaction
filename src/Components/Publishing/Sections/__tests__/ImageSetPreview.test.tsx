import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ImageSetFull, ImageSetMini } from "../../Fixtures/Components"
import { ImageSetPreview } from "../ImageSetPreview"
import { WrapperWithFullscreenContext } from "../../Fixtures/Helpers"

const renderSnapshot = props => {
  return renderer
    .create(WrapperWithFullscreenContext(<ImageSetPreview {...props} />))
    .toJSON()
}
let props = { section: null }

it("renders a full image set properly", () => {
  props.section = ImageSetFull
  const imageset = renderSnapshot(props)
  expect(imageset).toMatchSnapshot()
})
it("renders a mini image set properly", () => {
  props.section = ImageSetMini
  const imageset = renderSnapshot(props)
  expect(imageset).toMatchSnapshot()
})
