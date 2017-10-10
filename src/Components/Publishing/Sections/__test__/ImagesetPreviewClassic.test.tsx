import "jest-styled-components"

import * as React from "react"
import * as renderer from "react-test-renderer"
import { Images } from "../../Fixtures/Components"
import ImageSetPreviewClassic from "../ImagesetPreviewClassic"

it("renders properly", () => {
  const imageset = renderer.create(<ImageSetPreviewClassic images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
