import Icon from "Components/Icon"
import { IconHamburger } from "Components/Publishing/Icon/IconHamburger"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SubNav } from "../SubNav"

describe("SubNav", () => {
  it("renders SubNav", () => {
    // @ts-ignore
    const buttons = renderer.create(<SubNav />) as any
    expect(buttons).toMatchSnapshot()
  })
  it("toggles the mobile nav", () => {
    // @ts-ignore
    const nav = mount(<SubNav />) as any
    nav.find(IconHamburger).simulate("click")
    expect(nav.state().mobileNavIsOpen).toBe(true)
    nav.find(Icon).simulate("click")
    expect(nav.state().mobileNavIsOpen).toBe(false)
  })
})
