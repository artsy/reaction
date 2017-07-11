import * as React from "react"
import * as renderer from "react-test-renderer"

import ImageCollection from "../image_collection"
import { Images } from "./fixtures"

it("renders properly", () => {
  const image = renderer.create(<ImageCollection image={Images} />).toJSON()
  expect(image).toMatchSnapshot()
})
