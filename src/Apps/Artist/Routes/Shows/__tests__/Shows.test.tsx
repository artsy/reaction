import { ShowsRouteFragmentContainer as ShowsRoute } from "Apps/Artist/Routes/Shows"
import { MockBoot, renderRelayTree } from "DevTools"

import { ShowsFixture } from "Apps/__tests__/Fixtures/Artist/Routes/ShowsFixture"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")

describe("Shows Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: ShowsRoute,
      query: graphql`
        query Shows_Test_Query($artist_id: String!) {
          viewer {
            ...Shows_viewer
          }
        }
      `,
      mockData: { viewer: ShowsFixture },
      variables: {
        artist_id: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper components", () => {
      expect(wrapper.find("ArtistShows").length).toBe(3)
      expect(wrapper.find("Pagination").length).toBe(3)
      expect(wrapper.find("ArtistShowBlockItem").length).toBe(4)
      expect(wrapper.find("ArtistShowBlockItem").find("img").length).toBe(4)
      expect(wrapper.find("ArtistShowListItem").length).toBe(8)
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

      expect(getPaginationAt(0).length).toBe(2)
      expect(getPaginationAt(1).length).toBe(3)
      expect(getPaginationAt(2).length).toBe(5)
    })
  })
})
