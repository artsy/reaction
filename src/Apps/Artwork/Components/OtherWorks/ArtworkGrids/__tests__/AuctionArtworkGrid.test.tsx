import { AuctionArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/AuctionArtworkGrid.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { AuctionArtworkGridFragmentContainer } from "../AuctionArtworkGrid"

describe("AuctionArtworkGrid", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = AuctionArtworkGridFixture) => {
    return await renderRelayTree({
      Component: AuctionArtworkGridFragmentContainer,
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
