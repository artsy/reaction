// @ts-ignore
import { ArtistRecommendations_artist } from "__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendations_Test_Query } from "__generated__/ArtistRecommendations_Test_Query.graphql"
import { MockBoot, MockRelayRenderer, renderUntil } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ArtistRecommendationsPaginationContainer as ArtistRecommendations } from "../ArtistRecommendations"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "../RecommendedArtist"

jest.unmock("react-relay")

describe("ArtistRecommendations", () => {
  async function getWrapper(artistData: any) {
    return await renderUntil(
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
          mockData={{
            artist: artistData,
          }}
        />
      </MockBoot>
    )
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

  it("Doesn`t render `show more` button when less than three artists", async () => {
    const wrapper = await getWrapper(defaultArtist)

    expect(wrapper.find("button").length).toEqual(0)
  })

  it("Renders `show more` button when more than three artists available", async () => {
    const wrapper = await getWrapper(pagedArtist)

    expect(wrapper.find("button").length).toEqual(1)
  })
})

const artistFields = {
  name: "",
  formatted_nationality_and_birthday: "",
  href: "",
  image: null,
  artworks_connection: null,
  is_followed: false,
  counts: null,
}

const defaultArtist = {
  name: "Juan Gris",
  related: {
    artists: {
      pageInfo: {
        hasNextPage: false,
        endCursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
      },
      edges: [
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
            _id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
        },
      ],
    },
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw==",
  _id: "QXJ0aXN0Omp1YW4tZ3Jpcw==",
}

const pagedArtist = {
  name: "Juan Gris",
  related: {
    artists: {
      pageInfo: {
        hasNextPage: true,
        endCursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30=",
      },
      edges: [
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
            _id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
        },
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29=",
            _id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29=",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc29=",
        },
        {
          node: {
            id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30=",
            _id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30=",
            ...artistFields,
          },
          cursor: "QXJ0aXN0OnBhYmxvLXBpY2Fzc30=",
        },
      ],
    },
  },
  id: "QXJ0aXN0Omp1YW4tZ3Jpcw==",
  _id: "QXJ0aXN0Omp1YW4tZ3Jpcw==",
}
