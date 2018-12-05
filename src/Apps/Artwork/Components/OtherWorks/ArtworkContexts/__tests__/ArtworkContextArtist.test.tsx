import { ArtworkContextArtistFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkContexts/ArtworkContextArtist.fixture"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { ArtworkContextArtistFragmentContainer } from "../ArtworkContextArtist"

jest.unmock("react-relay")

describe("ArtworkContextArtist", () => {
  const getWrapper = async (response = ArtworkContextArtistFixture) => {
    return await renderRelayTree({
      Component: ArtworkContextArtistFragmentContainer,
      query: graphql`
        query ArtworkContextArtist_Test_Query {
          artwork(id: "on-kawara-9-jan-1973") {
            ...ArtworkContextArtist_artwork
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

    it("renders the artist name", () => {
      const html = wrapper.html()
      expect(html).toContain("Other works by On Kawara")
    })

    it("renders a view all button", () => {
      const html = wrapper.html()
      expect(html).toContain("View all")
    })

    it("renders correct artwork grids", () => {
      expect(wrapper.find("ArtistArtworkGrid").length).toBe(1)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(1)
    })
  })
})
