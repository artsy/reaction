import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import { MobileNavMenu } from "../MobileNavMenu"

describe("MobileNavMenu", () => {
  const getWrapper = props => {
    return mount(
      <SystemContextProvider user={props.user}>
        <MobileNavMenu />
      </SystemContextProvider>
    )
  }

  const defaultLinks = [
    ["/", "Home"],
    ["/artists", "Artists"],
    ["/shows", "Shows"],
    ["/galleries", "Galleries"],
    ["/institutions", "Museums"],
    ["/fairs", "Fairs"],
    ["/auctions", "Auctions"],
    ["/articles", "Magazine"],
  ]

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const wrapper = getWrapper({ user: null })
      const links = wrapper.find("MobileLink")

      defaultLinks.forEach(([href, linkLabel], index) => {
        const navLink = links.at(index)
        expect(href).toEqual(navLink.prop("href"))
        expect(linkLabel).toEqual(navLink.text())
      })

      // These links dont have an `href` prop, but are controlled via JS
      expect(wrapper.html()).toContain("Login")
      expect(wrapper.html()).toContain("Sign up")
    })

    it("renders correct items when logged in", () => {
      const wrapper = getWrapper({ user: true })
      const links = wrapper.find("MobileLink")

      defaultLinks
        .concat([
          ["/works-for-you", "Works for you"],
          ["/user/edit", "Account"],
        ])
        .forEach(([href, linkLabel], index) => {
          const navLink = links.at(index)
          expect(href).toEqual(navLink.prop("href"))
          expect(linkLabel).toEqual(navLink.text())
        })
    })
  })
})
