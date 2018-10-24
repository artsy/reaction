import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { ArtworkSidebarFixture } from "../../../__test__/Fixtures/Artwork/ArtworkSidebar"
import { ArtworkSidebarArtists } from "../ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "../ArtworkSidebar/ArtworkSidebarMetadata"
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
  it("renders ArtworkSidebarArtists component", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })
  it("renders Metadata component", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })
})
