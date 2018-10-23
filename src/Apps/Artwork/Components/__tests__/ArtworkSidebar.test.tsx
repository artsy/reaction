import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { NoAuctionArtworkSidebarFixture } from "../../../__test__/Fixtures/Artwork/ArtworkSidebar"
import { ArtworkSidebarFragmentContainer } from "../ArtworkSidebar/index"

jest.unmock("react-relay")

describe("NoAuctionArtworkSidebar", () => {
  const getWrapper = async (response = NoAuctionArtworkSidebarFixture) => {
    return await renderRelayTree({
      Component: ArtworkSidebarFragmentContainer,
      query: graphql`
        query ArtworkSidebar_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebar_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("ArtworkSidebarArtists", () => {
    let data = null
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
      beforeEach(() => {
        data = cloneDeep(NoAuctionArtworkSidebarFixture)
        data.artists.push({
          __id: "QXJ0aXN0OmVkLXJ1c2NoYQ==",
          id: "ed-ruscha",
          name: "Ed Ruscha",
          href: "/artist/ed-ruscha",
          is_followed: false,
          counts: {
            follows: 15431,
          },
          is_consignable: true,
        })
      })
      it("displays artist names for multiople artists", async () => {
        const wrapper = await getWrapper(data)
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
        const wrapper = await getWrapper(data)
        expect(wrapper.html()).not.toContain("Follow")
      })
    })
  })
})
