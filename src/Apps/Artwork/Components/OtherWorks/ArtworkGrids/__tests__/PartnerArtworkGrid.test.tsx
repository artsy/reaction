import { PartnerArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/PartnerArtworkGrid.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { PartnerArtworkGridFragmentContainer } from "../PartnerArtworkGrid"

describe("PartnerArtworkGrid", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = PartnerArtworkGridFixture) => {
    return await renderRelayTree({
      Component: PartnerArtworkGridFragmentContainer,
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
