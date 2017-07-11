import * as React from "react"
import * as renderer from "react-test-renderer"

import IconImageset from "../icons/icon_imageset"

it("renders properly", () => {
  const icon = renderer.create(<IconImageset />).toJSON()
  expect(icon).toMatchSnapshot()
})
