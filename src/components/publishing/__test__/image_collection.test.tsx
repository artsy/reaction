import * as React from "react"
import * as renderer from "react-test-renderer"

import ImageCollection from "../sections/image_collection"
import { Images } from "./fixtures"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const image = renderer.create(<ImageCollection images={Images} size={900} targetHeight={400} gutter={10} />).toJSON()
  expect(image).toMatchSnapshot()
})
