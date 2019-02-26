import { renderRelayTree } from "DevTools"
import { MockBoot } from "DevTools/MockBoot"
import React from "react"
import { graphql } from "react-relay"

import { PreviewGridItem } from "../../PreviewGridItem"
import { ArtistSearchPreviewFragmentContainer } from "../index"
import { MarketingCollectionsPreview } from "../MarketingCollections"
import { RelatedArtworksPreview } from "../RelatedArtworks"

jest.unmock("react-relay")
jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://staging.artsy.net",
  },
}))

const getWrapper = (viewer, breakpoint = "xl") => {
  return renderRelayTree({
    Component: ArtistSearchPreviewFragmentContainer,
    query: graphql`
      query TestsQuery($entityID: String!) {
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

describe("ArtistSearchPreviewFragmentContainer", () => {
  describe("an artist with no marketing collections", () => {
    it("renders related artworks", async () => {
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
  })

  describe("an artist with marketing collections", () => {
    it("renders marketing collections", async () => {
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

    it("includes links to collections", async () => {
      const viewer = {
        artist: {
          id: "andy-warhol",
          marketingCollections: [
            {
              title: "Andy Warhol: Prettiest Flowers",
              slug: "andy-warhol-prettiest-flowers",
              headerImage: "http://path/to/image.jpg",
            },
            {
              title: "Andy Warhol: Soup Cans Yo!",
              slug: "andy-warhol-soup-cans-yo",
              headerImage: "http://path/to/another-image.jpg",
            },
          ],
        },
        filter_artworks: {
          artworks_connection: {
            edges: [],
          },
        },
      }

      const component = await getWrapper(viewer)
      const hrefs = component.find("a").map(node => node.props().href)
      const expected = viewer.artist.marketingCollections.map(
        collection => `https://staging.artsy.net/collection/${collection.slug}`
      )
      expect(hrefs).toEqual(expected)
    })
  })
})
