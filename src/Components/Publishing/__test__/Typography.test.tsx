import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Typography } from "../__stories__/TypographyExamples"

it("renders properly", () => {
  const typography = renderer.create(<Typography />).toJSON()
  expect(typography).toMatchSnapshot()
})
