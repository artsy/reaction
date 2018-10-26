import { RelatedArtistsFixture } from "Apps/__test__/Fixtures/Artist/Routes/RelatedArtistsFixture"
import { RelatedArtistsRouteFragmentContainer as RelatedArtists } from "Apps/Artist/Routes/RelatedArtists"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

describe("RelatedArtists Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <RelatedArtists viewer={RelatedArtistsFixture as any} />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("general behavior", () => {
    let artistCardWrapper

    beforeAll(() => {
      wrapper = getWrapper()
      artistCardWrapper = wrapper.find("ArtistCard")
    })

    it("renders proper components", () => {
      expect(artistCardWrapper.length).toBe(2)
      expect(wrapper.find("Pagination").length).toBe(1)
    })

    it("renders correct number of related ArtistCards", () => {
      expect(artistCardWrapper.at(0).html()).toContain("Robert Indiana")
      expect(artistCardWrapper.at(1).html()).toContain("Tom Wesselmann")
    })
  })
})
