import { ArtworkContextPartnerShowFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkContexts/ArtworkContextPartnerShow.fixture"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { ArtworkContextPartnerShowFragmentContainer } from "../ArtworkContextPartnerShow"

jest.unmock("react-relay")

describe("ArtworkContextPartnerShow", () => {
  const getWrapper = async (response = ArtworkContextPartnerShowFixture) => {
    return await renderRelayTree({
      Component: ArtworkContextPartnerShowFragmentContainer,
      query: graphql`
        query ArtworkContextPartnerShow_Test_Query {
          artwork(id: "jacky-tsai-kissers-1") {
            ...ArtworkContextPartnerShow_artwork
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
      expect(html).toContain("Other works from Jacky Tsai | Reincarnation")
    })

    it("renders a view all button", () => {
      const html = wrapper.html()
      expect(html).toContain("View all")
    })

    it("renders correct artwork grids", () => {
      expect(wrapper.find("PartnerShowArtworkGrid").length).toBe(1)
      expect(wrapper.find("ArtistArtworkGrid").length).toBe(1)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(1)
    })
  })
})
