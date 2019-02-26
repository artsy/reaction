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

const buildArtworksConnection: any = (numberOfItems: number) => {
  const edges = Array(numberOfItems)
    .fill(1)
    .map((_, i) => ({
      node: buildNode(i),
    }))

  return {
    edges,
  }
}

const buildNode: any = (nodeIndex: number) => ({
  artist_names: "Andy Warhol",
  date: "tomorrow",
  href: `http://artsy.net/artwork/ugly-flower-${nodeIndex}`,
  image: {
    cropped: { url: "http://path/to/ugly-image.jpg" },
  },
  title: `Ugly Flower-${nodeIndex}`,
})

describe("ArtistSearchPreviewFragmentContainer", () => {
  describe("an artist with no marketing collections", () => {
    describe("an artist with related artworks", () => {
      it("renders 10 related artworks at lg", async () => {
        const viewer = {
          artist: {
            id: "andy-warhol",
            marketingCollections: [],
          },
          filter_artworks: {
            artworks_connection: buildArtworksConnection(10),
          },
        }

        const wrapper = await getWrapper(viewer, "lg")

        expect(wrapper.find(MarketingCollectionsPreview).length).toEqual(0)
        expect(wrapper.find(RelatedArtworksPreview).length).toEqual(1)
        expect(wrapper.find(PreviewGridItem).length).toEqual(10)
      })

      it("renders 5 artworks at md", async () => {
        const viewer = {
          artist: {
            id: "andy-warhol",
            marketingCollections: [],
          },
          filter_artworks: {
            artworks_connection: buildArtworksConnection(10),
          },
        }

        const wrapper = await getWrapper(viewer, "md")

        expect(wrapper.find(PreviewGridItem).length).toEqual(5)
      })

      describe("an artist with no related artworks", () => {
        // it("renders an empty preview", async() => {})
      })
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
