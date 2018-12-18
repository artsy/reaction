import { ArtistArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/ArtistArtworkGrid.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { ArtistArtworkGridFragmentContainer } from "../ArtistArtworkGrid"

describe("ArtistArtworkGrid", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = ArtistArtworkGridFixture) => {
    return await renderRelayTree({
      Component: ArtistArtworkGridFragmentContainer,
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

  beforeAll(async () => {
    wrapper = await getWrapper()
  })

  it("", () => {
    //
  })
})
