import ImagesetPreview from "../imageset_preview"
import { ImageSetFull, ImageSetMini } from "./fixtures"

import * as React from "react"
import * as renderer from "react-test-renderer"

it("renders a full image-set properly", () => {
  const imageset = renderer.create(<ImagesetPreview section={ImageSetFull} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
it("renders a mini image-set properly", () => {
  const imageset = renderer.create(<ImagesetPreview section={ImageSetMini} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
