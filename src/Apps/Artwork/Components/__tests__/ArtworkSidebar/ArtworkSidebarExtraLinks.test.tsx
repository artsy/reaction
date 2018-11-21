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
      console.log(wrapper.text())
      expect(wrapper.text()).toContain(
        "By placing your bid you agree to Artsy's Conditions of Sale."
      )
      expect(wrapper.text()).toContain(
        "Have a question? Read our auction FAQs or ask a specialist."
      )
      expect(wrapper.text()).toContain(
        "Want to sell a work by this artist? Learn more."
      )
    })
    it("displays conditions of sale link that opens conditions of sale page", () => {
      expect(wrapper.find('a[children="Conditions of Sale"]').length).toBe(1)
      wrapper
        .find('a[children="Conditions of Sale"]')
        .at(0)
        .simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/conditions-of-sale/),
        "_blank"
      )
    })
    it("displays FAQ link that brings auction FAQ modal", () => {
      expect(wrapper.find('a[children="auction FAQs"]').length).toBe(1)
      wrapper
        .find('a[children="auction FAQs"]')
        .at(0)
        .simulate("click")
      // TODO: verify mediator call with openAuctionFAQModal
    })
    it("displays ask a specialist link that brings ask an auction specialist modal", () => {
      expect(wrapper.find('a[children="ask a specialist"]').length).toBe(1)
      wrapper
        .find('a[children="ask a specialist"]')
        .at(0)
        .simulate("click")
      // TODO: verify mediator call with openAuctionAskSpecialistModal
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Learn more"]').length).toBe(1)
      wrapper
        .find('a[children="Learn more"]')
        .at(0)
        .simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
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
    it("displays FAQ link that opens Buy now FAQ page", () => {
      expect(wrapper.find('a[children="Read our FAQ"]').length).toBe(1)
      wrapper
        .find('a[children="Read our FAQ"]')
        .at(0)
        .simulate("click")
      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/buy-now-feature-faq/),
        "_blank"
      )
    })
    it("displays ask a specialist link that brings ask sale specialist modal", () => {
      expect(wrapper.find('a[children="ask a specialist"]').length).toBe(1)
      wrapper
        .find('a[children="ask a specialist"]')
        .at(0)
        .simulate("click")
      // TODO: verify mediator call with openBuyNowAskSpecialistModal
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Learn more"]').length).toBe(1)
      wrapper
        .find('a[children="Learn more"]')
        .at(0)
        .simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
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
    it("displays FAQ link that brings collector FAQ modal", () => {
      expect(wrapper.find('a[children="Read our FAQ"]').length).toBe(1)
      wrapper
        .find('a[children="Read our FAQ"]')
        .at(0)
        .simulate("click")
      // TODO: verify mediator call with openCollectorFAQModal
    })
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Learn more"]').length).toBe(1)
      wrapper
        .find('a[children="Learn more"]')
        .at(0)
        .simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
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
    it("displays consign link that opens consign page", () => {
      expect(wrapper.find('a[children="Learn more"]').length).toBe(1)
      wrapper
        .find('a[children="Learn more"]')
        .at(0)
        .simulate("click")

      expect(window.open).toHaveBeenCalledWith(
        expect.stringMatching(/consign/),
        "_blank"
      )
    })
  })
})
