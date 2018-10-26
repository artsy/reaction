import { ShowsRouteFragmentContainer as ShowsRoute } from "Apps/Artist/Routes/Shows"
import { MockBoot } from "DevTools"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

import { ShowsFixture } from "Apps/__test__/Fixtures/Artist/Routes/ShowsFixture"
import { RelayStubProvider } from "DevTools/RelayStubProvider"

jest.unmock("react-relay")

describe("Shows Route", () => {
  let wrapper: ReactWrapper

  function getWrapper(breakpoint: Breakpoint = "xl") {
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
      expect(wrapper.find("ArtistShowListItem").length).toEqual(8)
    })

    it("renders correct sections", () => {
      expect(wrapper.html()).toContain("Currently on view")
      expect(wrapper.html()).toContain("Upcoming")
      expect(wrapper.html()).toContain("Past")
    })
  })
})
