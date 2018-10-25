import { RelatedArtistsFixture } from "Apps/__test__/Fixtures/Artist/Routes/RelatedArtistsFixture"
import { RelatedArtistsRouteFragmentContainer as RelatedArtists } from "Apps/Artist/Routes/RelatedArtists"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")

describe("RelatedArtists Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: RelatedArtists,
      query: graphql`
        query RelatedArtists_Test_Query($artistID: String!) {
          viewer {
            ...RelatedArtists_viewer
          }
        }
      `,
      mockResolvers: {
        Viewer: () => ({
          mainArtists: RelatedArtistsFixture.viewer.mainArtists,
        }),
        Artist: () => RelatedArtistsFixture.viewer.mainArtists,
      },
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    let artistCardWrapper

    beforeAll(async () => {
      wrapper = await getWrapper()
      artistCardWrapper = wrapper.find("ArtistCard")
    })

    it("renders proper components", () => {
      expect(artistCardWrapper.length).toEqual(2)
      expect(wrapper.find("Pagination").length).toBe(1)
    })

    it("renders correct number of related ArtistCards", () => {
      expect(artistCardWrapper.at(0).html()).toContain("Robert Indiana")
      expect(artistCardWrapper.at(1).html()).toContain("Tom Wesselmann")
    })
  })
})
