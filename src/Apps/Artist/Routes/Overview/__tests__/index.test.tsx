// @ts-ignore
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextProvider } from "Artsy"
import { mount } from "enzyme"
import React from "react"
import { Provider } from "unstated"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "../Components/ArtistRecommendations"
import { OverviewRoute } from "../index"
import {
  artistWithRelatedArtists,
  defaultArtist,
  OverviewRouteArtist,
  userWithoutRecommendationsLabFeature,
  userWithRecommendationsLabFeature,
} from "./Index.fixture"

// Mocking the ArtworkFilter component because we're not using it in these tests,
//  and it takes a lot of setup data to get it to render.
jest.mock("Apps/Artist/Routes/Overview/Components/ArtworkFilter", () => ({
  ArtworkFilterFragmentContainer: () => <div>Mock ArtworkFilter</div>,
}))

describe("OverviewRoute", () => {
  describe("Artist Recommendations", () => {
    function getWrapper(
      artistData: OverviewRouteArtist,
      user: User = userWithRecommendationsLabFeature
    ) {
      return mount(
        <Provider inject={[{} as FilterState]}>
          <ContextProvider user={user}>
            <OverviewRoute artist={artistData} />
          </ContextProvider>
        </Provider>
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

    it("Does not display recommendations if there are related artists but user doesn`t have access", () => {
      const wrapper = getWrapper(
        artistWithRelatedArtists,
        userWithoutRecommendationsLabFeature
      )

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })
  })
})
