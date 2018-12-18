import { FairArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/FairArtworkGrid.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { FairArtworkGridFragmentContainer } from "../FairArtworkGrid"

describe("FairArtworkGrid", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = FairArtworkGridFixture) => {
    return await renderRelayTree({
      Component: FairArtworkGridFragmentContainer,
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
