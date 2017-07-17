import * as React from "react"
import * as renderer from "react-test-renderer"

import ImageCollection from "../image_collection"
import { Images } from "./fixtures"

it("renders properly", () => {
  const image = renderer.create(<ImageCollection images={Images} width={900} targetHeight={400} gutter={10} />).toJSON()
  expect(image).toMatchSnapshot()
})
