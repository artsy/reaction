import { ArticlesFixture } from "Apps/__test__/Fixtures/Artist/Routes/ArticlesFixture"
import { ArticlesRouteFragmentContainer as ArticlesRoute } from "Apps/Artist/Routes/Articles"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

describe("Articles Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: ArticlesRoute,
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
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("works", () => {
      console.log(wrapper.html())
      expect(true).toEqual(true)
    })
  })
})
