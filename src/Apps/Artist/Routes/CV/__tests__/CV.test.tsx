import { CVRouteFragmentContainer as CV } from "Apps/Artist/Routes/CV"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

import { CVFixture } from "Apps/__test__/Fixtures/Artist/Routes/CV"

jest.unmock("react-relay")

describe("CV Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: CV,
      query: graphql`
        query CV_Test_Query($artistID: String!) {
          viewer {
            ...CV_viewer
          }
        }
      `,

      // Incorrect
      mockResolvers: {
        Viewer: () => ({ viewer: CVFixture }),
        // Wrong
        Artist: () => ({ artist: CVFixture.artist_soloShows }),
        // Better
        // Artist: () => CVFixture.artist_soloShows,

        // Returns an undefined connection when commented out, fixed when uncommented
        // Show: () => CVFixture.artist_soloShows.showsConnection.edges[0].node,

        ShowConnection: () => CVFixture.artist_soloShows.showsConnection,
      },

      // Correct
      // mockResolvers: {
      //   Viewer: () => CVFixture,
      //   Artist: () => CVFixture.artist_soloShows,
      //   Show: () => CVFixture.artist_soloShows.showsConnection.edges[0].node,
      //   ShowConnection: () => CVFixture.artist_soloShows.showsConnection,
      // },

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

    it("renders correct data", () => {
      const html = wrapper.html()
      expect(html).toContain("Picasso Prints")
    })
  })
})
