import * as React from "react"
import * as renderer from "react-test-renderer"

import ImagesetPreview from "../imageset_preview"
import { Images } from "./fixtures"

it("renders properly", () => {
  const imageset = renderer.create(<ImagesetPreview images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
