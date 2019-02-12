import { ArtistSearchPreview_artist } from "__generated__/ArtistSearchPreview_artist.graphql"
import { mount } from "enzyme"
import React from "react"

import { ArtistSearchPreview } from "../index"
import { MarketingCollectionsPreview } from "../MarketingCollections"
import { RelatedArtworksPreviewQueryRenderer as RelatedArtworks } from "../RelatedArtworks"

describe(ArtistSearchPreview, () => {
  it("renders related artworks when there are no marketing collections for the artist", () => {
    const artist: ArtistSearchPreview_artist = {
      id: "andy-warhol",
      marketingCollections: [],
      " $refType": null,
    }

    const wrapper = mount(<ArtistSearchPreview artist={artist} />)

    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(0)
    expect(wrapper.find(RelatedArtworks).length).toEqual(1)
  })

  it("renders marketing collections when there are marketing collections for the artist", () => {
    const artist: ArtistSearchPreview_artist = {
      id: "andy-warhol",
      marketingCollections: [
        {
          title: "Flowers in spring",
        },
        {
          title: "Shovels in winter",
        },
      ],
      " $refType": null,
    }

    const wrapper = mount(<ArtistSearchPreview artist={artist} />)

    expect(wrapper.find(RelatedArtworks).length).toEqual(0)
    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(1)
  })
})
