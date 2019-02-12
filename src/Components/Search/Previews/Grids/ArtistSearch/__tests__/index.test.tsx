import { ArtistSearchPreview_viewer } from "__generated__/ArtistSearchPreview_viewer.graphql"
import { mount } from "enzyme"
import React from "react"

import { ArtistSearchPreview } from "../index"
import { MarketingCollectionsPreview } from "../MarketingCollections"
import { RelatedArtworksPreview } from "../RelatedArtworks"

describe(ArtistSearchPreview, () => {
  it("renders related artworks when there are no marketing collections for the artist", () => {
    const viewer: ArtistSearchPreview_viewer = {
      artist: {
        id: "andy-warhol",
        marketingCollections: [],
      },
      " $fragmentRefs": null,
      " $refType": null,
    }

    const wrapper = mount(<ArtistSearchPreview viewer={viewer} />)

    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(0)
    expect(wrapper.find(RelatedArtworksPreview).length).toEqual(1)
  })

  it("renders marketing collections when there are marketing collections for the artist", () => {
    const viewer: ArtistSearchPreview_viewer = {
      artist: {
        id: "andy-warhol",
        marketingCollections: [
          {
            title: "Flowers in spring",
            " $fragmentRefs": null,
          },
          {
            title: "Shovels in winter",
            " $fragmentRefs": null,
          },
        ],
      },
      " $fragmentRefs": null,
      " $refType": null,
    }

    const wrapper = mount(<ArtistSearchPreview viewer={viewer} />)

    expect(wrapper.find(RelatedArtworksPreview).length).toEqual(0)
    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(1)
  })
})
