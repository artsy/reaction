import { graphql } from "react-relay"
import { renderRelayTree } from "../../../../DevTools"
import { ArtistHeaderFixture } from "../../../__test__/Fixtures/Artist/ArtistHeader"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "../ArtistHeader"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  const getWrapper = async (response = ArtistHeaderFixture) => {
    return await renderRelayTree({
      Component: ArtistHeader,
      query: graphql`
        query ArtistHeader_Test_Query {
          artist(id: "pablo-picasso") {
            ...ArtistHeader_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => response,
      },
    })
  }

  it("renders correct information about the artist", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("British")
    expect(html).toContain("born 1969")
    expect(html).toContain("9,135 followers")
  })

  it("renders the follow button in the correct state", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Following")
    expect(html).not.toContain("Follow")
  })
})
