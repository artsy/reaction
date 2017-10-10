import * as React from "react"
import * as renderer from "react-test-renderer"
import IconRemove from "../../icon/remove"

it("renders properly", () => {
  const icon = renderer.create(<IconRemove />).toJSON()
  expect(icon).toMatchSnapshot()
})

it("renders with fill props", () => {
  const icon = renderer.create(<IconRemove fill="red" />).toJSON()
  expect(icon).toMatchSnapshot()
})
