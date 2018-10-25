import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { FollowArtistButton } from "../../../../../Components/FollowButton/FollowArtistButton"
import { renderRelayTree } from "../../../../../DevTools"
import {
  MultipleArtists,
  SingleFollowedArtist,
} from "../../../../__test__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarArtists"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
  const data = null
  let wrapper = null

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

    it("does not render follow buttons", () => {
      expect(wrapper.find(FollowArtistButton).length).toBe(0)
      expect(wrapper.html()).not.toContain("Follow")
    })

    it("separates artist names by comma", () => {
      expect(wrapper.text()).toBe("Josef Albers, Ed Ruscha")
    })
  })
})
