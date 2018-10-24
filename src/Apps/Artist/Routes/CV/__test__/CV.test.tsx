import { CV_Test_Query } from "__generated__/CV_Test_Query.graphql"
import React from "react"
import { graphql } from "react-relay"
import {
  MockBoot,
  MockRelayRenderer,
  renderUntil,
} from "../../../../../DevTools"
import {
  CVFixture,
  showsConnection,
} from "../../../../__test__/Fixtures/Artist/CV"
import { CVRouteFragmentContainer as CV } from "../../CV"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  it("renders correct information about the artist", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(CV).length > 0
      },
      <MockBoot breakpoint="lg">
        <MockRelayRenderer<CV_Test_Query>
          Component={CV}
          query={graphql`
            query CV_Test_Query($artistID: String!) {
              viewer {
                ...CV_viewer
              }
            }
          `}
          mockResolvers={{
            Viewer: () => ({ viewer: { artist_soloShows: CVFixture } }),
            Artist: () => ({ artist: CVFixture }),
            ShowConnection: () => showsConnection,
          }}
          variables={{ artistID: "andy-warhol" }}
        />
      </MockBoot>
    )

    const html = tree.html()
    expect(html).toContain("Catty Art Show")
    expect(html).toContain("Catty Partner")
  })
})
