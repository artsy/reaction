import * as React from "react"
import * as renderer from "react-test-renderer"

import "jest-styled-components"

import Share from "../share"

it("renders a saved caption properly", () => {
  const share = renderer
    .create(<Share url="http://artsy.net/article/point-pencils" title="The Point of Pencils" />)
    .toJSON()
  expect(share).toMatchSnapshot()
})
