import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Icon from "../../../Icon"
import { IconHamburger } from "../../Icon/IconHamburger"
import { SubNav } from "../SubNav"

describe("SubNav", () => {
  it("renders SubNav", () => {
    const buttons = renderer.create(<SubNav />)
    expect(buttons).toMatchSnapshot()
  })
  it("toggles the mobile nav", () => {
    const nav = mount(<SubNav />)
    nav.find(IconHamburger).simulate("click")
    expect(nav.state().mobileNavIsOpen).toBe(true)
    nav.find(Icon).simulate("click")
    expect(nav.state().mobileNavIsOpen).toBe(false)
  })
})
