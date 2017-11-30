import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SubNav } from "../SubNav"

describe("SubNav", () => {
  it("renders SubNav", () => {
    const buttons = renderer.create(<SubNav />)
    expect(buttons).toMatchSnapshot()
  })
})
