import { renderRelayTree } from "DevTools"
import { MockBoot } from "DevTools/MockBoot"
import React from "react"
import { graphql } from "react-relay"

import { PreviewGridItem } from "../../PreviewGridItem"
import {
  ArtistSearchPreviewFragmentContainer,
} from "../index"
import { MarketingCollectionsPreview } from "../MarketingCollections"
import { RelatedArtworksPreview } from "../RelatedArtworks"

jest.unmock("react-relay")

const getWrapper = (viewer, breakpoint = "xl") => {
  return renderRelayTree({
    Component: ArtistSearchPreviewFragmentContainer,
    query: graphql`
      query ArtistSearchPreviewQuery($entityID: String!) {
        viewer {
          ...ArtistSearchPreview_viewer @arguments(entityID: $entityID)
        }
      }
    `,
    mockData: {
      viewer,
    },
    variables: {
      entityID: "andy",
    },
    wrapper: children => (
      <MockBoot breakpoint={breakpoint as any}>{children}</MockBoot>
    ),
  })
}

describe(ArtistSearchPreviewFragmentContainer, () => {
  it("renders related artworks when there are no marketing collections for the artist", async () => {
    const viewer = {
      artist: {
        id: "andy-warhol",
        marketingCollections: [],
      },
      filter_artworks: {
        artworks_connection: {
          edges: [
            {
              node: {
                artist_names: "Andy Warhol",
                date: "yesterday",
                href: "http://artsy.net/artwork/pretty-flower",
                image: { cropped: { url: "http://path/to/image.jpg" } },
                title: "Pretty Flower",
              },
            },
            {
              node: {
                artist_names: "Andy Warhol",
                date: "tomorrow",
                href: "http://artsy.net/artwork/ugly-flower",
                image: { cropped: { url: "http://path/to/ugly-image.jpg" } },
                title: "Ugly Flower",
              },
            },
          ],
        },
      },
    }

    const wrapper = await getWrapper(viewer)

    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(0)
    expect(wrapper.find(RelatedArtworksPreview).length).toEqual(1)
    expect(wrapper.find(PreviewGridItem).length).toEqual(2)
  })

  it("renders marketing collections when there are marketing collections for the artist", async () => {
    const viewer = {
      artist: {
        id: "andy-warhol",
        marketingCollections: [
          {
            headerImage: "http://path/to/image.jpg",
            slug: "flowers-in-spring",
            title: "Flowers in spring",
          },
          {
            headerImage: "http://path/to/another-image.jpg",
            slug: "shovels-in-winter",
            title: "Shovels in winter",
          },
        ],
      },
      filter_artworks: {
        artworks_connection: {
          edges: [],
        },
      },
    }

    const wrapper = await getWrapper(viewer)

    expect(wrapper.find(RelatedArtworksPreview).length).toEqual(0)
    expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(1)
  })
})
