import { mount } from "enzyme"
import React from "react"

import { SystemContextProvider } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"

import { QueryRenderer as _QueryRenderer } from "react-relay"
import { MoreNavMenu, UserMenu } from "../Menus"
import { NavBar, NavbarContext } from "../NavBar"
import { NavItem } from "../NavItem"

describe("NavBarTracking", () => {
  const tracking = {
    trackEvent: jest.fn(),
    getTrackingData: jest.fn(),
  }

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return (
      <SystemContextProvider user={user} mediator={{ trigger: jest.fn() }}>
        <NavbarContext.Provider
          value={{
            tracking,
            Schema,
          }}
        >
          {children}
        </NavbarContext.Provider>
      </SystemContextProvider>
    )
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("tracks MoreNavMenu clicks", () => {
    const wrapper = mount(
      <Wrapper>
        <MoreNavMenu />
      </Wrapper>
    )
    const menuItems = wrapper.find("MenuItem")
    menuItems.first().simulate("click")
    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.HeaderUserDropdown,
      destination_path: "/galleries",
    })
  })

  it("tracks UserMenu clicks", () => {
    const wrapper = mount(
      <Wrapper>
        <UserMenu />
      </Wrapper>
    )
    const menuItems = wrapper.find("MenuItem")
    menuItems.first().simulate("click")
    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.HeaderUserDropdown,
      destination_path: "/user/saves",
    })
  })

  it("tracks NavBar notification badge clicks", () => {
    const wrapper = mount(
      <Wrapper>
        <NavBar tracking={tracking} />
      </Wrapper>
    )
    wrapper
      .find("Link")
      .find({ href: "/works-for-you" })
      .first()
      .simulate("click")

    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.Header,
      subject: Schema.Subject.NotificationBell,
      destination_path: "/works-for-you",
    })
  })

  it("tracks NavBar login button clicks", () => {
    const wrapper = mount(
      <Wrapper user={null}>
        <NavBar tracking={tracking} />
      </Wrapper>
    )
    wrapper
      .find("Button")
      .first()
      .simulate("click")

    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.Header,
      subject: Schema.Subject.Login,
    })
  })

  it("tracks NavBar signup button clicks", () => {
    const wrapper = mount(
      <Wrapper user={null}>
        <NavBar tracking={tracking} />
      </Wrapper>
    )
    wrapper
      .find("Button")
      .last()
      .simulate("click")

    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.Header,
      subject: Schema.Subject.Signup,
    })
  })

  it("tracks show mobile menu hamburger button clicks", () => {
    const wrapper = mount(
      <Wrapper user={null}>
        <NavBar tracking={tracking} />
      </Wrapper>
    )
    wrapper
      .find(".mobileHamburgerButton")
      .first()
      .simulate("click")

    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.Header,
      subject: Schema.Subject.SmallScreenMenuSandwichIcon,
    })
  })

  it("tracks NavItem item clicks", () => {
    const wrapper = mount(
      <Wrapper>
        <NavItem href="/art-fairs">Fairs</NavItem>
      </Wrapper>
    )

    wrapper.find("NavItem").simulate("click")

    expect(tracking.trackEvent).toBeCalledWith({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.Header,
      subject: "Fairs",
      destination_path: "/art-fairs",
    })
  })
})
