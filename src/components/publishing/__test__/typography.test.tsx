import * as React from "react"
import * as renderer from "react-test-renderer"

import Typography from "../__stories__/typography"

it("renders properly", () => {
  const typography = renderer.create(<Typography />).toJSON()
  expect(typography).toMatchSnapshot()
})
