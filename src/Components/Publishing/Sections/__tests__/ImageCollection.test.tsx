import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Images } from "../../Fixtures/Components"
import { ImageCollection } from "../ImageCollection"
import { WrapperWithFullscreenContext } from "../../Fixtures/Helpers"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

const renderSnapshot = props => {
  return renderer
    .create(WrapperWithFullscreenContext(<ImageCollection {...props} />))
    .toJSON()
}

let props = {
  targetHeight: 400,
  gutter: 10,
  images: null,
}
it("renders properly", () => {
  props.images = Images
  const image = renderSnapshot(props)
  expect(image).toMatchSnapshot()
})

it("renders a single image properly", () => {
  props.images = [Images[0]]
  const image = renderSnapshot(props)
  expect(image).toMatchSnapshot()
})
