import { Shows_Test_Query } from "__generated__/Shows_Test_Query.graphql"
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
import { ShowsRouteFragmentContainer as Shows } from "../../Shows"

jest.unmock("react-relay")

describe("ArtistHeader", () => {
  it("renders correct show information", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(Shows).length > 0
      },
      <MockBoot breakpoint="lg">
        <MockRelayRenderer<Shows_Test_Query>
          Component={Shows}
          query={graphql`
            query Shows_Test_Query($artistID: String!) {
              viewer {
                ...Shows_viewer
              }
            }
          `}
          mockResolvers={{
            Viewer: () => ({ viewer: { artist_currentShows: CVFixture } }),
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
