import { SystemContextProvider } from "Artsy"
import * as authentication from "Components/NavBar/Utils/authentication"
import { mount } from "enzyme"
import React from "react"
import { UserMenu } from "../UserMenu"

jest.mock("Components/NavBar/Utils/authentication")
jest.mock("Artsy/Analytics/useTracking", () => {
  return {
    useTracking: () => ({
      trackEvent: jest.fn(),
    }),
  }
})

describe("UserMenu", () => {
  const mediator = {
    trigger: jest.fn(),
  }

  const getWrapper = () => {
    return mount(
      <SystemContextProvider mediator={mediator}>
        <UserMenu />
      </SystemContextProvider>
    )
  }

  // Label also includes SVG image title
  const defaultLinks = [
    ["/user/saves", "Save Saves & Follows"],
    ["/profile/edit", "user Collector Profile"],
    ["/user/edit", "settings Settings"],
  ]

  it("renders correct menu items", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("MenuItem")

    defaultLinks.forEach(([href, linkLabel], index) => {
      const navLink = links.at(index)
      expect(href).toEqual(navLink.prop("href"))
      expect(linkLabel).toEqual(navLink.text())
    })

    expect(
      wrapper
        .find("MenuItem")
        .last()
        .text()
    ).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    const wrapper = getWrapper()
    wrapper
      .find("MenuItem")
      .last()
      .simulate("click")
    expect(authentication.logout).toHaveBeenCalledWith(mediator)
  })
})
