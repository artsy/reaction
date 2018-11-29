import { CurrentEventFixture } from "Apps/__tests__/Fixtures/Artist/Routes/Overview/CurrentEvent"
import { CurrentEventFragmentContainer as CurrentEvent } from "Apps/Artist/Routes/Overview/Components/CurrentEvent"
import { renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")

describe("CurrentEvent", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: CurrentEvent,
      query: graphql`
        query CurrentEvent_Test_Query {
          artist(id: "pablo-picasso") {
            ...CurrentEvent_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => CurrentEventFixture,
      },
    })
  }

  it("renders the current event information", async () => {
    wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Currently at auction")
    expect(html).toContain("Live bidding begins soon")
    expect(html).toContain("/auction/catty-art-sale")
  })
})
