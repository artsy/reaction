import ImagesetPreview from "../imageset_preview"
import { Images } from "./fixtures"

import * as React from "react"
import * as renderer from "react-test-renderer"

it("renders properly", () => {
  const imageset = renderer.create(<ImagesetPreview images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
