import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkActions/ArtworkGrids/ArtworkActions.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { ArtworkActionsFragmentContainer } from "../ArtworkActions"

describe("ArtworkActions", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = ArtworkActionsFixture) => {
    return await renderRelayTree({
      Component: ArtworkActionsFragmentContainer,
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
