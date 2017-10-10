import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import Typography from "../__stories__/typography_examples"

it("renders properly", () => {
  const typography = renderer.create(<Typography />).toJSON()
  expect(typography).toMatchSnapshot()
})
