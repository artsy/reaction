import { ArtworkRelatedArtistsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkRelatedArtists.fixture"
import { mockTracking } from "Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { ArtworkRelatedArtists } from "../ArtworkRelatedArtists"

jest.unmock("react-tracking")

describe("ArtworkRelatedArtists", () => {
  const getWrapper = props => {
    return mount(<ArtworkRelatedArtists {...props} />)
  }

  it("renders related artists", () => {
    const props = { artwork: { artist: ArtworkRelatedArtistsFixture } }

    const wrapper = getWrapper(props)

    expect(wrapper.find("ArtistCard").length).toEqual(4)
  })

  it("tracks ArtistCard clicks", () => {
    const { Component, dispatch } = mockTracking(ArtworkRelatedArtists)
    const props = {
      artwork: { artist: ArtworkRelatedArtistsFixture, " $refType": null },
    }

    const wrapper = mount(<Component {...props} />)

    const artistCard = wrapper.find("ArtistCard").at(0)
    artistCard.simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "RelatedArtists",
      type: "Artist card",
    })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
