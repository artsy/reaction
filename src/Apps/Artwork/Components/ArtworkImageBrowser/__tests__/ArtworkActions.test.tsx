import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser/ArtworkActions.fixture"
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
        query ArtworkActions_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkActions_artwork
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
