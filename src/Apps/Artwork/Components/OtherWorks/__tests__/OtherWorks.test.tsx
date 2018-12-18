import { OtherWorksFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkGrids/OtherWorks.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { OtherWorksFragmentContainer } from "../OtherWorks"

describe("OtherWorks", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = OtherWorksFixture) => {
    return await renderRelayTree({
      Component: OtherWorksFragmentContainer,
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
