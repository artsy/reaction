import { Breakpoint } from "@artsy/palette"
import { SingleNonFollowedArtist } from "Apps/__tests__/Fixtures/Artists"
import { FollowArtistPopoverFragmentContainer as FollowArtistPopover } from "Components/v2/FollowArtistPopover"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("Follow Artist Popover", () => {
  let wrapper: ReactWrapper

  const artistNode = {
    _id: "mongo-id",
    image: {
      cropped: {
        url: "/path/to/image.jpg",
      },
    },
    ...SingleNonFollowedArtist[0],
  }

  const artistResponse = {
    artist: {
      related: {
        suggested: {
          edges: [{ node: artistNode }],
        },
      },
    },
  }

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: FollowArtistPopover,
      query: graphql`
        query FollowArtistPopover_Test_Query($artist_id: String!) {
          artist(id: $artist_id) {
            ...FollowArtistPopover_artist
          }
        }
      `,
      mockData: artistResponse,
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
