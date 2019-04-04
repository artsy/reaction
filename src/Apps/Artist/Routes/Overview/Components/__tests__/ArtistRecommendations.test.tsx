// @ts-ignore
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendations_Test_Query } from "__generated__/ArtistRecommendations_Test_Query.graphql"
import { MockBoot, MockRelayRenderer, renderUntil } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ArtistRecommendationsFragmentContainer as ArtistRecommendations } from "../ArtistRecommendations"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "../RecommendedArtist"

jest.unmock("react-relay")

describe("ArtistRecommendations", () => {
  async function getWrapper(artistData: any) {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(ArtistRecommendations).length > 0
      },
      <MockBoot breakpoint="lg">
        <MockRelayRenderer<ArtistRecommendations_Test_Query>
          Component={ArtistRecommendations}
          query={graphql`
            query ArtistRecommendations_Test_Query {
              artist(id: "andy-warhol") {
                ...ArtistRecommendations_artist
              }
            }
          `}
          mockResolvers={{
            Artist: () => artistData,
          }}
        />
      </MockBoot>
    )
    return tree
  }

  it("Doesn`t explode when there are no recommended artists", async () => {
    const request = {
      ...defaultArtist,
      related: { artists: null },
    }

    const wrapper = await getWrapper(request)

    expect(wrapper.html()).toContain("Related to Juan Gris")
    expect(wrapper.find(RecommendedArtist).length).toEqual(0)
  })

  it("Renders recommended artists when they exist", async () => {
    const wrapper = await getWrapper(defaultArtist)

    expect(wrapper.html()).toContain("Related to Juan Gris")
    expect(wrapper.find(RecommendedArtist).length).toEqual(1)
  })

  const defaultArtist = {
    name: "Juan Gris",
    related: {
      artists: {
        edges: [
          {
            node: {
              __id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
              __fragments: {
                RecommendedArtist_artist: {},
              },
            },
          },
        ],
      },
    },
    __id: "QXJ0aXN0Omp1YW4tZ3Jpcw==",
  }
})
