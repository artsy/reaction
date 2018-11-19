import {
  AcquireableArtworkWithOneConsignableArtist,
  InquireableArtworkWithMultipleConsignableArtists,
  LiveAuctionArtwork,
  NotForSaleArtworkWithOneConsignableArtist,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarExtraLinks"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"
import { ArtworkSidebarExtraLinksFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarExtraLinks"

jest.unmock("react-relay")

describe("ArtworkSidebarExtraLinks", () => {
  let wrapper = null

  const getWrapper = async (response = {}) => {
    return await renderRelayTree({
      Component: ArtworkSidebarExtraLinksFragmentContainer,
      query: graphql`
        query ArtworkSidebarExtraLinks_Test_Query {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarExtraLinks_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("for work in an auction", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(LiveAuctionArtwork)
    })
    it("displays proper text", () => {
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale"
      )
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Learn more."
      )
    })
    xit("displays proper links", () => {
      // TODO: implement
    })
  })

  describe("for Buy now work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(AcquireableArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      expect(wrapper.text()).toContain(
        "Have a question? Read our FAQ or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Learn more."
      )
    })
    xit("displays proper links", () => {
      // TODO: implement
    })
  })

  describe("for inquireable work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(
        InquireableArtworkWithMultipleConsignableArtists
      )
    })

    it("displays proper text", () => {
      expect(wrapper.text()).toContain("Have a question? Read our FAQ.")
      expect(wrapper.text()).toContain(
        "Want to sell a work by these artists? Learn more."
      )
    })
    xit("displays proper links", () => {
      // TODO: implement
    })
  })

  describe("for not for sale work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(NotForSaleArtworkWithOneConsignableArtist)
    })
    it("displays proper text", () => {
      expect(wrapper.text()).not.toContain("Have a question? Read our FAQ")
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Learn more."
      )
    })
    xit("displays proper links", () => {
      // TODO: implement
    })
  })
})
