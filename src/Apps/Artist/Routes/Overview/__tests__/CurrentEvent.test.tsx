import { CurrentEventFixture } from "Apps/__test__/Fixtures/Artist/Routes/Overview/CurrentEvent"
import { CurrentEventFragmentContainer as CurrentEvent } from "Apps/Artist/Routes/Overview/Components/CurrentEvent"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  const getWrapper = async (response = CurrentEventFixture) => {
    return await renderRelayTree({
      Component: CurrentEvent,
      query: graphql`
        query CurrentEvent_Test_Query {
          artist(id: "pablo-picasso") {
            ...CurrentEvent_artist
          }
        }
      `,
      mockResolvers: { Artist: () => response },
    })
  }

  it("renders the current event information", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Currently at auction")
    expect(html).toContain("Live bidding begins soon")
    expect(html).toContain("/auction/catty-art-sale")
  })
})
