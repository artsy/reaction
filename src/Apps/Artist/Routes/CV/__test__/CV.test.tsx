import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../../DevTools"
import { CVFixture } from "../../../../__test__/Fixtures/Artist/CV"
import { CVRouteFragmentContainer as CV } from "../../CV"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  const getWrapper = async (response = CVFixture) => {
    return await renderRelayTree({
      Component: CV,
      query: graphql`
        query CV_Test_Query {
          viewer {
            ...CV_viewer
          }
        }
      `,
      mockResolvers: { Viewer: () => {} },
    })
  }

  it("renders correct information about the artist", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    console.log(html)
  })
})
