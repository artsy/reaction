import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { AccountButtons } from "../AccountButtons"

describe("AccountButtons", () => {
  it("renders AccountButtons", () => {
    const buttons = renderer.create(<AccountButtons />)
    expect(buttons).toMatchSnapshot()
  })
})
