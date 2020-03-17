import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import { filter, map } from "lodash"
import React from "react"
// import { NavigatorContextProvider } from "../NavigatorContextProvider"

import { menuData, SimpleLinkData } from "../../menuData"
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

      const openWrapper = animatingMenuWrapper.filterWhere(
        element => element.props().isOpen
      )
      const linkContainer = openWrapper.find("ul").at(0)
      const mobileSubmenuLinks = linkContainer.children(MobileSubmenuLink)

      expect(mobileSubmenuLinks.length).toBe(2)

      let linkText = mobileSubmenuLinks.first().text()
      expect(linkText).toContain("Artworks")
      expect(linkText).not.toContain("New This Week")

      linkText = mobileSubmenuLinks.last().text()
      expect(linkText).toContain("Artists")
      expect(linkText).not.toContain("Career Stages")

      const simpleLinks = linkContainer.children(MobileLink)

      expect(simpleLinks.length).toBe(7)
      ;(menuData.links as SimpleLinkData[])
        .slice(2)
        .map(({ href, text }, index) => {
          const simpleLink = simpleLinks.at(index)
          expect(href).toEqual(simpleLink.prop("href"))
          expect(text).toEqual(simpleLink.text())
        })

      linkText = linkContainer.text()
      expect(linkText).toContain("Sign Up")
      expect(linkText).not.toContain("Works for you")
    })
  })
})
