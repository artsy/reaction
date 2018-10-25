import { CVRouteFragmentContainer as CV } from "Apps/Artist/Routes/CV"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "Utils/Responsive"

import {
  CVFixture,
  showsConnection,
} from "Apps/__test__/Fixtures/Artist/Routes/CV"

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
      mockResolvers: {
        Viewer: () => ({ viewer: { artist_soloShows: CVFixture } }),
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

    it("renders correct data", () => {
      const html = wrapper.html()
      expect(html).toContain("Catty Art Show")
      expect(html).toContain("Catty Partner")
    })
  })
})
