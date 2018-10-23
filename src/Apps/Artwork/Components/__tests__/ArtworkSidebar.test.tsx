import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { ArtworkSidebarFixture } from "../../../__test__/Fixtures/Artwork/ArtworkSidebar"
import { ArtworkSidebarArtists } from "../ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarFragmentContainer } from "../ArtworkSidebar/index"

jest.unmock("react-relay")

describe("ArtworkSidebar", () => {
  const getWrapper = async (response = ArtworkSidebarFixture) => {
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
    it("rentdes ArtworkSidebarArtists component", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
    })
    it("displays artist name properly", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper.find({
          href: "/artist/josef-albers",
        }).length
      ).toBe(1)
    })
    it("renders artist follow button properly", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Follow")
    })
  })
})
