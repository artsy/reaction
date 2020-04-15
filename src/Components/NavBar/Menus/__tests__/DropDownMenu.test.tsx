import { MenuItem } from "@artsy/palette"
import { ContextModule } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import { menuData, MenuLinkData } from "../../menuData"
import { DropDownNavMenu, MenuItemContainer } from "../DropDownMenu"
import { DropDownSection } from "../DropDownSection"

jest.mock("Artsy/Analytics/useTracking")

describe("DropDownMenu", () => {
  const trackEvent = jest.fn()
  const getWrapper = () => {
    return mount(
      <DropDownNavMenu
        menu={(menuData.links[0] as MenuLinkData).menu}
        contextModule={ContextModule.HeaderArtworksDropdown}
      />
    )
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders simple links", () => {
    const wrapper = getWrapper()
    const menuItemContainers = wrapper.find(MenuItemContainer)

    expect(menuItemContainers.length).toBe(5)
    expect(menuItemContainers.at(0).text()).toContain("New this Week")
    expect(menuItemContainers.at(1).text()).toContain("Trending this Month")
    expect(menuItemContainers.at(2).text()).toContain("Exclusively on Artsy")
    expect(menuItemContainers.at(3).text()).toContain("Closing Soon")
  })

  it("renders correct number of DropDownSection links", () => {
    const wrapper = getWrapper()
    const dropDownSection = wrapper.find(DropDownSection)

    expect(dropDownSection.length).toBe(5)
  })

  xit("tracks analytics click events correctly", () => {
    const wrapper = getWrapper()
    wrapper
      .find(MenuItem)
      .first()
      .simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action_type: "Click",
      context_module: "HeaderArtworksDropdown",
      subject: "New this Week",
      destination_path: "/collection/new-this-week",
    })
  })
})
