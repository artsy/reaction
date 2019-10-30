import { mount } from "enzyme"
import React from "react"

import { AnalyticsSchema, SystemContextProvider } from "Artsy"

import { useTracking } from "Artsy/Analytics/useTracking"
import { QueryRenderer as _QueryRenderer } from "react-relay"
import { MobileNavMenu, MoreNavMenu, UserMenu } from "../Menus"
import { NavBar } from "../NavBar"
import { NavItem } from "../NavItem"

jest.mock("Artsy/Analytics/useTracking")
jest.mock("Utils/Hooks/useMedia", () => ({
  useMedia: () => ({ sm: false }),
}))

describe("NavBarTracking", () => {
  const trackEvent = jest.fn()

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return (
      <SystemContextProvider user={user} mediator={{ trigger: jest.fn() }}>
        {children}
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("NavBar", () => {
    it("tracks NavBar notification badge clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Link")
        .find({ href: "/works-for-you" })
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.NotificationBell,
        destination_path: "/works-for-you",
        new_notification_count: 0,
      })
    })

    it("tracks NavBar login button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Button")
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.Login,
      })
    })

    it("tracks NavBar signup button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Button")
        .last()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.Signup,
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
          context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
          parentNode: {
            parentNode: {
              getAttribute: () => "/galleries",
            },
          },
        },
      })
      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
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
      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
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

      wrapper.find("Link").simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: "Fairs",
        destination_path: "/art-fairs",
      })
    })

    it("tracks navItem on hover", () => {
      mount(
        <Wrapper>
          <NavItem href="/art-fairs" active>
            {({ hover }) => {
              if (hover) {
                trackEvent({
                  action_type: AnalyticsSchema.ActionType.Hover,
                  subject: AnalyticsSchema.Subject.NotificationBell,
                  destination_path: "/works-for-you",
                  new_notification_count: 0,
                })
              }
              return <div>hi</div>
            }}
          </NavItem>
        </Wrapper>
      )

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Hover,
        subject: AnalyticsSchema.Subject.NotificationBell,
        destination_path: "/works-for-you",
        new_notification_count: 0,
      })
    })
  })

  describe("Mobile", () => {
    it("tracks show mobile menu hamburger button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find(".mobileHamburgerButton")
        .find("Link")
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
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
        .at(1)
        .simulate("click", {
          target: {
            innerText: "Artists",
            parentNode: {
              getAttribute: () => "/artists",
            },
          },
        })

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: "Artists",
        destination_path: "/artists",
      })
    })
  })
})
