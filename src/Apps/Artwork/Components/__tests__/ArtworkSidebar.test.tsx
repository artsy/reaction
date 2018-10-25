import { ArtworkSidebarFixture } from "Apps/__test__/Fixtures/Artwork/ArtworkSidebar"
import { ArtworkSidebarFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

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
  it("renders ArtworkSidebarArtists component", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })
  it("renders Metadata component", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })
})
