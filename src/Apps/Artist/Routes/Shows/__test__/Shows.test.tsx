import { ShowsRouteFragmentContainer as ShowsRoute } from "Apps/Artist/Routes/Shows"
import { MockBoot } from "DevTools"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

import { ShowsFixture } from "Apps/__test__/Fixtures/Artist/Routes/ShowsFixture"
import { RelayStubProvider } from "DevTools/RelayStubProvider"

describe("Shows Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <ShowsRoute viewer={ShowsFixture as any} />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("general behavior", () => {
    beforeAll(() => {
      wrapper = getWrapper()
    })

    it("renders proper components", () => {
      expect(wrapper.find("ArtistShows").length).toEqual(3)
      expect(wrapper.find("Pagination").length).toEqual(3)
      expect(wrapper.find("ArtistShowBlockItem").length).toEqual(4)
      expect(wrapper.find("ArtistShowBlockItem").find("img").length).toEqual(4)
      expect(wrapper.find("ArtistShowListItem").length).toEqual(8)
    })

    it("renders correct sections", () => {
      expect(wrapper.html()).toContain("Currently on view")
      expect(wrapper.html()).toContain("Upcoming")
      expect(wrapper.html()).toContain("Past")
    })

    it("renders correct top block items", () => {
      const getBlockAt = index =>
        wrapper
          .find("ArtistShowBlockItem")
          .at(index)
          .html()

      const titles = [
        "Autumn Contemporary - Gstaad, Switzerland",
        "BAILLY GALLERY at Art Élysées–Art &amp; Design 2018",
        "Galerie Philippe David at Art Élysées–Art &amp; Design 2018",
        "Dali: The Art of Surrealism and Paris School",
      ]

      titles.forEach((title, index) => {
        expect(getBlockAt(index)).toContain(title)
      })
    })

    it("renders the correct number of pages", () => {
      const getPaginationAt = index =>
        wrapper
          .find("Pagination")
          .at(index)
          .find("button")

      expect(getPaginationAt(0).length).toEqual(2)
      expect(getPaginationAt(1).length).toEqual(3)
      expect(getPaginationAt(2).length).toEqual(5)
    })
  })
})
