import {
  MultipleArtists,
  SingleFollowedArtist,
} from "Apps/__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
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

  let wrapper

  describe("ArtworkSidebarArtists with one artist", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("displays artist name for single artist", () => {
      expect(wrapper.html()).toContain("Josef Albers")
      expect(wrapper.find({ href: "/artist/josef-albers" }).length).toBe(1)
    })

    it("renders artist follow button for single artist", () => {
      expect(wrapper.html()).toContain("Follow")
    })
  })

  describe("ArtworkSidebarArtists with multiple artists", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(MultipleArtists)
    })

    it("displays artist names for multiople artists", () => {
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

    it("does not display follow buttons", () => {
      expect(wrapper.html()).not.toContain("Follow")
    })

    it("separates artist names by comma", () => {
      expect(wrapper.text()).toBe("Josef Albers, Ed Ruscha")
    })
  })
})
