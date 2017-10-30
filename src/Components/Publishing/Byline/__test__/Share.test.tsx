import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Share } from "../Share"

it("renders a saved caption properly", () => {
  const share = renderer
    .create(<Share url="http://artsy.net/article/point-pencils" title="The Point of Pencils" />)
    .toJSON()
  expect(share).toMatchSnapshot()
})
