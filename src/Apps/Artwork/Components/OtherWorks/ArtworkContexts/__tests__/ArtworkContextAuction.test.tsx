import { ArtworkContextAuctionFixture } from "Apps/__tests__/Fixtures/Artwork/OtherWorks/ArtworkContexts/ArtworkContextAuction.fixture"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount } from "enzyme"
import { cloneDeep } from "lodash"
import React from "react"
import { ArtworkContextAuctionFragmentContainer } from "../ArtworkContextAuction"

describe("ArtworkContextAuction", () => {
  const getWrapper = (props = ArtworkContextAuctionFixture) => {
    return mount(
      <RelayStubProvider>
        <ArtworkContextAuctionFragmentContainer
          artwork={props.artwork as any}
        />
      </RelayStubProvider>
    )
  }

  describe("rendering", () => {
    it("renders the title", () => {
      const html = getWrapper().html()
      expect(html).toContain("Other works from the auction")
    })

    it("renders a view all button", () => {
      const html = getWrapper().html()
      expect(html).toContain("View all")
    })
  })

  describe("artwork grid states", () => {
    it("shows AuctionArtworkGrid if auction is open", async () => {
      const data = cloneDeep(ArtworkContextAuctionFixture)
      data.artwork.sale.is_closed = false
      const wrapper = getWrapper(data)
      expect(wrapper.find("AuctionArtworkGrid").length).toBe(1)
      expect(wrapper.find("ArtistArtworkGrid").length).toBe(0)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(0)
    })

    it("shows AuctionArtworkGrid if auction is open", async () => {
      const data = cloneDeep(ArtworkContextAuctionFixture)
      data.artwork.sale.is_closed = true
      const wrapper = getWrapper(data)
      expect(wrapper.find("AuctionArtworkGrid").length).toBe(0)
      expect(wrapper.find("ArtistArtworkGrid").length).toBe(1)
      expect(wrapper.find("RelatedWorksArtworkGrid").length).toBe(1)
    })
  })
})

// FIXME: Start using this when `mockResolver` issue is figured out

// import { renderRelayTree } from "DevTools"
// import { graphql } from "react-relay"

// jest.unmock("react-relay")

// const getWrapper = async (response = ArtworkContextAuctionFixture) => {
//   return await renderRelayTree({
//     Component: ArtworkContextAuctionFragmentContainer,
//     query: graphql`
//       query ArtworkContextAuction_Test_Query {
//         artwork(id: "yavuz-tanyeli-self-portrait") {
//           ...ArtworkContextAuction_artwork
//         }
//       }
//     `,
//     mockResolvers: {
//       Artwork: () => response.artwork,
//       Sale: () => response.artwork.sale,
//       Artworks: () => response.artwork.sale.artworksConnection.edges[0].node,
//     },
//     variables: {
//       isClosed: false,
//       excludeArtworkIDs: ["5bfb5f6b94a94d0007afe818"],
//     },
//   })
// }

// it("excludes a given artwork", () => {
//   const html = wrapper.html()
//   expect(html).not.toContain("/artwork/yavuz-tanyeli-self-portrait")
// })
