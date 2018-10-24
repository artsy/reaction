import { ArticlesFixture } from "Apps/__test__/Fixtures/Artist/Routes/ArticlesFixture"
import { AuctionResultsRouteFragmentContainer as AuctionResults } from "Apps/Artist/Routes/AuctionResults"
import { ContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")

describe("Articles Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: AuctionResults,
      query: graphql`
        query Articles_Test_Query($artistID: String!) {
          artist(id: $artistID) {
            ...Articles_artist
          }
        }
      `,
      mockResolvers: {
        Artist: () => ArticlesFixture.artist,
      },
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>
          <ContextProvider>{children}</ContextProvider>
        </MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })
  })
})
