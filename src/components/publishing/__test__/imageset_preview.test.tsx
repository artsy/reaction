import ImageSetPreview from "../imageset_preview"
import { ImageSetFull, ImageSetMini } from "./fixtures"

import * as React from "react"
import * as renderer from "react-test-renderer"

it("renders a full image-set properly", () => {
  const imageset = renderer.create(<ImageSetPreview section={ImageSetFull} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
it("renders a mini image-set properly", () => {
  const imageset = renderer.create(<ImageSetPreview section={ImageSetMini} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
