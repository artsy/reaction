import { RelatedWorksArtworkGridFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkContexts/RelatedWorksArtworkGrid.fixture"
import { RelatedWorksArtworkGridRefetchContainer } from "Apps/Artwork/Components/OtherWorks/ArtworkGrids/RelatedWorksArtworkGrid"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("RelatedWorksArtworkGrid", () => {
  const getWrapper = async (response = RelatedWorksArtworkGridFixture) => {
    return await renderRelayTree({
      Component: RelatedWorksArtworkGridRefetchContainer,
      query: graphql`
        query RelatedWorksArtworkGrid_Test_Query {
          artwork(id: "david-hockney-early-morning-4") {
            ...RelatedWorksArtworkGrid_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response.artwork,
        ArtworkConnection: () => response.artwork.layer.artworksConnection,
      },
      wrapper: children => <MockBoot>{children}</MockBoot>,
    })
  }

  let wrapper: ReactWrapper

  describe("rendering", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders the artist name", () => {
      const html = wrapper.html()
      expect(html).toContain("Related works")
    })

    it("renders related tabs", () => {
      const html = wrapper.html()
      expect(html).toContain("Related Artworks At Art Miami 2018")
      expect(html).toContain("Most Similar")
      expect(html).toContain("Digital Painting and Drawing")
      expect(html).not.toContain("For Sale")
    })

    it("does not render a view all button", () => {
      const html = wrapper.html()
      expect(html).not.toContain("View all")
    })

    it("renders correct components", () => {
      expect(wrapper.find("Tabs").length).toBe(1)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(1)
    })
  })
})
