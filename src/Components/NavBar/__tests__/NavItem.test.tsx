import { mount } from "enzyme"
import React from "react"
import { NavItem } from "../NavItem"

jest.mock("Artsy/Analytics/useTracking", () => {
  return {
    useTracking: () => ({
      trackEvent: jest.fn(),
    }),
  }
})

describe("NavItem", () => {
  it("renders proper content", () => {
    const wrapper = mount(
      <NavItem href="/some-link">hello how are you</NavItem>
    )
    expect(wrapper.html()).toContain("hello how are you")
    expect(wrapper.find("Link").prop("href")).toContain("/some-link")
  })

  it("renders a Menu", () => {
    const wrapper = mount(
      <NavItem active href="/some-link" Menu={() => <div>Menu Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain("Menu Item")
  })

  it("shows / hides Menu on mouse interactions", () => {
    const wrapper = mount(
      <NavItem href="/some-link" Menu={() => <div>Menu Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).not.toContain("Menu Item")
    wrapper.find("Box").simulate("mouseenter")
    expect(wrapper.html()).toContain("Menu Item")
    wrapper.find("Box").simulate("mouseleave")
    expect(wrapper.html()).not.toContain("Menu Item")
  })

  it("renders a Overlay", () => {
    const wrapper = mount(
      <NavItem href="/some-link" Overlay={() => <div>Overlay Item</div>}>
        hello how are you
      </NavItem>
    )
    expect(wrapper.html()).toContain("Overlay Item")
  })

  it("calls onClick callbacks", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NavItem href="/some-link" onClick={spy}>
        hello how are you
      </NavItem>
    )
    wrapper.find("Box").simulate("click")
    expect(spy).toHaveBeenCalled()
  })
})
