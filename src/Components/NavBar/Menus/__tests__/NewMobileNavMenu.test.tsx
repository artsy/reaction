import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import { filter, map } from "lodash"
import React from "react"
// import { NavigatorContextProvider } from "../NavigatorContextProvider"

import { menuData } from "../../menuData"
import { MobileLink } from "../MobileLink"
import {
  AnimatingMenuWrapper,
  MobileSubmenuLink,
  NewMobileNavMenu,
} from "../NewMobileNavMenu"

describe("MobileNavMenu", () => {
  const getWrapper = props => {
    return mount(
      <SystemContextProvider user={props.user}>
        <NewMobileNavMenu isOpen menuData={menuData} />
      </SystemContextProvider>
    )
  }

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const wrapper = getWrapper({ user: null })
      const animatingMenuWrapper = wrapper.find(AnimatingMenuWrapper)

      let openWrapper
      let linkContainer
      animatingMenuWrapper.map(element => {
        if (element.props().isOpen) {
          linkContainer = element.find("ul").at(0)
          openWrapper = element
        }
      })

      const mobileSubmenuLinks = linkContainer.children(MobileSubmenuLink)

      expect(mobileSubmenuLinks.length).toBe(2)
      expect(mobileSubmenuLinks.first().prop("children")).toBe("Artworks")
      expect(mobileSubmenuLinks.last().prop("children")).toBe("Artists")

      const simpleLinks = linkContainer.children(MobileLink)
      console.log("number of simpleLinks:", simpleLinks.length)
      console.log("simpleLinks:", simpleLinks.first().props())

      // expect(linkContainer.children(MobileSubmenuLink).length).toBe(2)
      // expect(openWrapper).toContain("Artworks")
      // expect(openWrapper.at(0)).toContain("Artists")
      // expect(openWrapper.at(0)).toContain("Auctions")
      // expect(openWrapper.at(0)).toContain("Editorial")
      // expect(openWrapper.at(0)).toContain("Galleries")
    })
  })
})
