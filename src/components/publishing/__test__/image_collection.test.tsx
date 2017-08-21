import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import ImageCollection from "../sections/image_collection"
import { Images } from "./fixtures/components"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const image = renderer.create(<ImageCollection images={Images} targetHeight={400} gutter={10} />).toJSON()
  expect(image).toMatchSnapshot()
})

it("renders a single image properly", () => {
  const image = renderer.create(<ImageCollection images={[Images[0]]} targetHeight={400} gutter={10} />).toJSON()
  expect(image).toMatchSnapshot()
})
