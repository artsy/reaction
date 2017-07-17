import ImagesetPreviewClassic from "../imageset_preview_classic"
import { Images } from "./fixtures"

import * as React from "react"
import * as renderer from "react-test-renderer"

it("renders properly", () => {
  const imageset = renderer.create(<ImagesetPreviewClassic images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
