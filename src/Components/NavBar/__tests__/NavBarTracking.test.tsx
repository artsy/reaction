import { mount } from "enzyme"
import React from "react"

import { SystemContextProvider } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"

import { QueryRenderer as _QueryRenderer } from "react-relay"
import { MobileNavMenu, MoreNavMenu, UserMenu } from "../Menus"
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

  describe("NavBar", () => {
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
        subject: Schema.Subject.Signup,
      })
    })
  })

  describe("MoreNavMenu", () => {
    it("tracks MoreNavMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <MoreNavMenu />
        </Wrapper>
      )
      const menuItems = wrapper.find("MenuItem")
      menuItems.first().simulate("click", {
        target: {
          context_module: Schema.ContextModule.HeaderMoreDropdown,
          parentNode: {
            parentNode: {
              getAttribute: () => "/galleries",
            },
          },
        },
      })
      expect(tracking.trackEvent).toBeCalledWith({
        context_module: Schema.ContextModule.HeaderMoreDropdown,
        destination_path: "/galleries",
      })
    })
  })

  describe("UserMenu", () => {
    it("tracks UserMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <UserMenu />
        </Wrapper>
      )
      const menuItems = wrapper.find("MenuItem")
      menuItems.first().simulate("click", {
        target: {
          parentNode: {
            parentNode: {
              getAttribute: () => "/user/saves",
            },
          },
        },
      })
      expect(tracking.trackEvent).toBeCalledWith({
        context_module: Schema.ContextModule.HeaderUserDropdown,
        destination_path: "/user/saves",
      })
    })
  })

  describe("NavItem", () => {
    it("tracks NavItem item clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavItem href="/art-fairs">Fairs</NavItem>
        </Wrapper>
      )

      wrapper.find("NavItem").simulate("click")

      expect(tracking.trackEvent).toBeCalledWith({
        subject: "Fairs",
        destination_path: "/art-fairs",
      })
    })
  })

  describe("Mobile", () => {
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
        subject: Schema.Subject.SmallScreenMenuSandwichIcon,
      })
    })

    it("tracks mobile dropdown clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <MobileNavMenu />
        </Wrapper>
      )

      wrapper
        .find("MobileLink")
        .last()
        .simulate("click", {
          target: {
            innerText: "Magazine",
            parentNode: {
              getAttribute: () => "/articles",
            },
          },
        })

      expect(tracking.trackEvent).toBeCalledWith({
        subject: "Magazine",
        destination_path: "/articles",
      })
    })
  })
})
