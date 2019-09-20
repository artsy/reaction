import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "../Components/ArtistRecommendations"
import { OverviewRoute } from "../index"
import { artistWithRelatedArtists, defaultArtist } from "./Index.fixture"

// Mocking the ArtworkFilter component because we're not using it in these tests,
//  and it takes a lot of setup data to get it to render.
jest.mock("Components/v2/ArtworkFilter/ArtworkFilterContext", () => ({
  ArtworkFilterContextProvider: () => <div>Mock ArtworkFilter</div>,
}))
jest.mock("Components/v2/ArtworkFilter", () => ({
  BaseArtworkFilter: () => <div>Mock ArtworkFilter</div>,
}))

describe("OverviewRoute", () => {
  describe("Artist Recommendations", () => {
    function getWrapper(artistData, user: User = {}) {
      return mount(
        <SystemContextProvider user={user}>
          <OverviewRoute artist={artistData} location={{} as any} />
        </SystemContextProvider>
      )
    }

    it("Does not display recommendations if related.artists is empty", () => {
      const wrapper = getWrapper(defaultArtist)

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Does not display recommendations if related.artists.edges.length === 0", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        related: {
          ...defaultArtist.related,
          artists: {
            edges: [],
          },
        },
      })

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Displays recommendations if there are related artists", () => {
      const wrapper = getWrapper(artistWithRelatedArtists)

      expect(wrapper.find(ArtistRecommendations).length).toEqual(1)
    })
  })
})
