import { NavigationTabsFixture } from "Apps/__tests__/Fixtures/Artist/Components/NavigationTabs"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import { SystemContextProvider } from "Artsy"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/v2/RouteTabs")

describe("ArtistHeader", async () => {
  const getWrapper = async (response = NavigationTabsFixture, context = {}) => {
    return await renderRelayTree({
      Component: ({ artist }: any) => {
        return (
          <SystemContextProvider {...context}>
            <NavigationTabs artist={artist} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query NavigationTabs_Test_Query {
          artist(id: "pablo-picasso") {
            ...NavigationTabs_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => response,
      },
    })
  }

  it("renders (or doesnt) the appropriate tabs based on the counts", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Shows")
    expect(html).toContain("/artist/andy-warhol/shows")
    expect(html).toContain("CV")
    expect(html).toContain("/artist/andy-warhol/cv")
    expect(html).toContain("Auction results")
    expect(html).toContain("/artist/andy-warhol/auction-results")
    expect(html).not.toContain("Articles")
    expect(html).not.toContain("/artist/andy-warhol/articles")
  })
})
