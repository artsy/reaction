import "jest-styled-components"

import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../fixtures/components"
import ImageSetPreviewClassic from "../imageset_preview_classic"

it("renders properly", () => {
  const imageset = renderer.create(<ImageSetPreviewClassic images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
