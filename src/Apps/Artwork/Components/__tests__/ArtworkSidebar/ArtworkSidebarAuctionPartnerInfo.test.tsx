import { ArtworkWithEstimateAndPremium } from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionPartnerInfo"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarAuctionPartnerInfo", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: ArtworkSidebarAuctionPartnerInfoFragmentContainer,
      query: graphql`
        query ArtworkSidebarAuctionPartnerInfo_Test_Query {
          artwork(id: "auction_artwork_estimate_premium") {
            ...ArtworkSidebarAuctionPartnerInfo_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  let artwork

  describe("ArtworkSidebarAuctionPartnerInfo", () => {
    beforeEach(() => {
      artwork = Object.assign({}, ArtworkWithEstimateAndPremium)
    })

    it("displays partner name, estimate and premium", async () => {
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Bruun Rasmussen")
      expect(wrapper.text()).toContain(
        "Estimated value: DKK 100,000–DKK 125,000"
      )
      expect(wrapper.text()).toContain("buyer's premium")
    })

    it("displays artwork without premium", async () => {
      artwork.sale.is_with_buyers_premium = null

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).not.toContain("buyer's premium")
    })

    it("displays artwork without estimate", async () => {
      artwork.sale_artwork.estimate = null

      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).not.toContain("Estimated value")
    })

    it("does not display anything for closed auctions", async () => {
      artwork.sale.is_closed = true

      const wrapper = await getWrapper(artwork)
      expect(wrapper.html()).toBeNull()
    })
  })
})
