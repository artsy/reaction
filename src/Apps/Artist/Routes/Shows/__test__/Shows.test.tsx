import { ShowsRouteFragmentContainer as ShowsRoute } from "Apps/Artist/Routes/Shows"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

// import { ShowsFixture } from "Apps/__test__/Fixtures/Artist/Routes/ShowsFixture"

import {
  CVFixture,
  showsConnection,
} from "Apps/__test__/Fixtures/Artist/Routes/CV"

jest.unmock("react-relay")

describe("Shows Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: ShowsRoute,
      query: graphql`
        query Shows_Test_Query($artistID: String!) {
          viewer {
            ...Shows_viewer
          }
        }
      `,
      mockResolvers: {
        Viewer: () => ({ viewer: { artist_currentShows: CVFixture } }),
        Artist: () => ({ artist: CVFixture }),
        ShowConnection: () => showsConnection,
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

    it("to render proper data", () => {
      const html = wrapper.html()
      expect(html).toContain("Catty Art Show")
      expect(html).toContain("Catty Partner")
    })
  })
})
