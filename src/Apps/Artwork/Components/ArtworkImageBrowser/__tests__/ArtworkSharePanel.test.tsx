import { ArtworkSharePanelFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser/ArtworkSharePanel.fixture"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { ArtworkSharePanelFragmentContainer } from "../ArtworkSharePanel"

describe("ArtworkSharePanel", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = ArtworkSharePanelFixture) => {
    return await renderRelayTree({
      Component: ArtworkSharePanelFragmentContainer,
      query: graphql`
        query ArtworkSharePanel_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSharePanel_artwork
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
