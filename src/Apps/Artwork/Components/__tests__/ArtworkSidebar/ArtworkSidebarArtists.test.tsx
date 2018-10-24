import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../../DevTools"
import {
  MultipleArtists,
  SingleFollowedArtist,
} from "../../../../__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarArtists"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
  const data = null
  const getWrapper = async (response = SingleFollowedArtist) => {
    return await renderRelayTree({
      Component: ArtworkSidebarArtistsFragmentContainer,
      query: graphql`
        query ArtworkSidebarArtists_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarArtists_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }
  describe("ArtworkSidebarArtists with one artist", () => {
    it("displays artist name for single artist", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper.find({
          href: "/artist/josef-albers",
        }).length
      ).toBe(1)
    })
    it("renders artist follow button for single artist", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Follow")
    })
  })

  describe("ArtworkSidebarArtists with multiple artists", () => {
    it("displays artist names for multiople artists", async () => {
      const wrapper = await getWrapper(MultipleArtists)
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper.find({
          href: "/artist/josef-albers",
        }).length
      ).toBe(1)
      expect(wrapper.html()).toContain("Ed Ruscha")
      expect(
        wrapper.find({
          href: "/artist/ed-ruscha",
        }).length
      ).toBe(1)
    })
    it("does not display follow buttons", async () => {
      const wrapper = await getWrapper(MultipleArtists)
      expect(wrapper.html()).not.toContain("Follow")
    })
    it("separates artist names by comma", async () => {
      const wrapper = await getWrapper(MultipleArtists)
      // 2 artists are separared by 1 ,
      expect(wrapper.html().match(", ").length).toBe(1)
    })
  })
})
