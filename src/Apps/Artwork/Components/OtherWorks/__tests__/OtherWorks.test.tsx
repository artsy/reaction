import { OtherWorksFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/OtherWorks.fixture"
import { OtherWorksFragmentContainer } from "Apps/Artwork/Components/OtherWorks"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"

describe("OtherWorks", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (response = OtherWorksFixture) => {
    return await renderRelayTree({
      Component: OtherWorksFragmentContainer,
      query: graphql`
        query OtherWorks_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...OtherWorks_artwork
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
