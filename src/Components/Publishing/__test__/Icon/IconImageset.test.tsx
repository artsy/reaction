import * as React from "react"
import * as renderer from "react-test-renderer"
import { IconImageSet } from "../../Icon/ImageSet"

it("renders properly", () => {
  const icon = renderer.create(<IconImageSet />).toJSON()
  expect(icon).toMatchSnapshot()
})
