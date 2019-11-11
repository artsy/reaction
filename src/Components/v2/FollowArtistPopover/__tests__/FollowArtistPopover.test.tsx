import { Breakpoint } from "@artsy/palette"
import { FollowArtistPopover_Test_QueryRawResponse } from "__generated__/FollowArtistPopover_Test_Query.graphql"
import { SingleNonFollowedArtist } from "Apps/__tests__/Fixtures/Artists"
import { FollowArtistPopoverFragmentContainer as FollowArtistPopover } from "Components/v2/FollowArtistPopover"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("Follow Artist Popover", () => {
  let wrapper: ReactWrapper

  const artistNode: FollowArtistPopover_Test_QueryRawResponse["artist"]["related"]["suggestedConnection"]["edges"][number]["node"] = {
    internalID: "mongo-id",
    image: {
      cropped: {
        url: "/path/to/image.jpg",
      },
    },
    ...SingleNonFollowedArtist[0],
  }

  const artistResponse: FollowArtistPopover_Test_QueryRawResponse = {
    artist: {
      id: "opaque-artist-id",
      related: {
        suggestedConnection: {
          edges: [{ node: artistNode }],
        },
      },
    },
  }

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: FollowArtistPopover,
      query: graphql`
        query FollowArtistPopover_Test_Query($artistID: String!)
          @raw_response_type {
          artist(id: $artistID) {
            ...FollowArtistPopover_artist
          }
        }
      `,
      mockData: artistResponse as FollowArtistPopover_Test_QueryRawResponse,
      variables: {
        artist_id: "percy-z",
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

    it("renders proper elements", () => {
      expect(wrapper.html()).toContain("Francesca DiMattio")
    })
  })
})
