import { ArtworkContextFairFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkContexts/ArtworkContextFair.fixture"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { ArtworkContextFairFragmentContainer } from "../ArtworkContextFair"

jest.unmock("react-relay")

describe("ArtworkContextFair", () => {
  const getWrapper = async (response = ArtworkContextFairFixture) => {
    return await renderRelayTree({
      Component: ArtworkContextFairFragmentContainer,
      query: graphql`
        query ArtworkContextFair_Test_Query {
          artwork(id: "lucio-fontana-concetto-spaziale-attese-139") {
            ...ArtworkContextFair_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response.artwork,
        ArtworkConnection: () => response.artwork.artist.artworks_connection,
      },
      wrapper: children => <MockBoot>{children}</MockBoot>,
    })
  }

  let wrapper: ReactWrapper

  describe("rendering", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders the title", () => {
      const html = wrapper.html()
      expect(html).toContain("Other works from the booth")
    })

    it("renders a view all button", () => {
      const html = wrapper.html()
      expect(html).toContain("View all")
    })

    it("renders correct artwork grids", () => {
      expect(wrapper.find("FairArtworkGrid").length).toBe(1)
      expect(wrapper.find("PartnerShowArtworkGrid").length).toBe(1)
      expect(wrapper.find("ArtistArtworkGrid").length).toBe(1)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(1)
    })
  })
})
