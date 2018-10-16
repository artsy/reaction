import { cloneDeep } from "lodash"
import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { ArtworkDetailsFixture } from "../../../__test__/Fixtures/Artwork/ArtworkDetails"
import { ArtworkDetailsFragmentContainer } from "../ArtworkDetails/index"

jest.unmock("react-relay")

describe("ArtworkDetails", () => {
  const getWrapper = async (response = ArtworkDetailsFixture) => {
    return await renderRelayTree({
      Component: ArtworkDetailsFragmentContainer,
      query: graphql`
        query ArtworkDetails_Test_Query {
          artwork(id: "pablo-picasso") {
            ...ArtworkDetails_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  it("renders a correct component tree for artwork with all details", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("About the work")
    // One for Artsy details and one for partner details
    expect(wrapper.find("ReadMore").length).toBe(2)
    expect(html).toContain("Following")
    expect(html).toContain("Articles")
    expect(html).toContain("Exhibition history")
    expect(html).toContain("Bibliography")
  })

  it("does not render partner follow button if artwork is in auction", async () => {
    const data = cloneDeep(ArtworkDetailsFixture)
    data.is_in_auction = true
    const wrapper = await getWrapper(data)
    expect(wrapper.html()).not.toContain("Following")
  })
})
