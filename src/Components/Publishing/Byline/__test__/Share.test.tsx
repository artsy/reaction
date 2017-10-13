import "jest-styled-components"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { Share } from "../Share"

it("renders a saved caption properly", () => {
  const share = renderer
    .create(<Share url="http://artsy.net/article/point-pencils" title="The Point of Pencils" />)
    .toJSON()
  expect(share).toMatchSnapshot()
})
