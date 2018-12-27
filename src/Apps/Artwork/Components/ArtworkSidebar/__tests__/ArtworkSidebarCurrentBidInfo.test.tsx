import {
  AuctionPreview,
  AuctionPreviewNoStartingBid,
  ClosedAuctionArtwork,
  LiveAuctionInProgeress,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveMetWithMyLosingBid,
  OpenAuctionReserveMetWithMyWinningBid,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetIncreasingOwnBid,
  OpenAuctionReserveNotMetWithBids,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import { LosingBid } from "Assets/Icons/LosingBid"
import { WinningBid } from "Assets/Icons/WinningBid"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarCurrentBidInfo", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: ArtworkSidebarCurrentBidInfoFragmentContainer,
      query: graphql`
        query ArtworkSidebarCurrentBidInfo_Test_Query {
          artwork(id: "auction_artwork_estimate_premium") {
            ...ArtworkSidebarCurrentBidInfo_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("for closed auction", () => {
    it("displays Auction Closed", async () => {
      const wrapper = await getWrapper(ClosedAuctionArtwork)

      expect(wrapper.text()).toContain("Bidding closed")
    })
  })

  describe("for live sale in progress", () => {
    it("does not display anything", async () => {
      const wrapper = await getWrapper(LiveAuctionInProgeress)

      expect(wrapper.html()).toBe(null)
    })
  })

  describe("for auction preview", () => {
    it("displays proper starting bid info", async () => {
      const wrapper = await getWrapper(AuctionPreview)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("CHF 4,000")
    })
  })

  describe("for auction preview with no start bid set", () => {
    it("displays nothing if current bid info is unavailable", async () => {
      const wrapper = await getWrapper(AuctionPreviewNoStartingBid)
      expect(wrapper.html()).toBe(null)
    })
  })

  describe("for open auction with no reserve and no bids", () => {
    it("displays proper starting bid info", async () => {
      const wrapper = await getWrapper(OpenAuctionNoReserveNoBids)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("$500")
    })
  })

  describe("open auction with no reserve with bids present", () => {
    it("displays proper current bid info including bid count", async () => {
      const wrapper = await getWrapper(OpenAuctionNoReserveWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("11 bids")
      expect(wrapper.text()).toContain("$850")
    })
  })

  describe("for open auction with reserve and no bids", () => {
    it("displays proper starting bid info and resserve message", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNoBids)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("This work has a reserve.")
      expect(wrapper.text()).toContain("$3,000")
    })
  })

  describe("for open auction with some bids and reserve not met", () => {
    it("displays current bid message inculding reserve warning", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNotMetWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("2 bids, reserve not met.")
      expect(wrapper.text()).toContain("$10,000")
    })
  })

  describe("for open auction with some bids and satisfied reserve", () => {
    it("displays current bid message inculding reserve met", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("2 bids, reserve met.")
      expect(wrapper.text()).toContain("$500")
    })
  })

  describe("for open auction with my bid winning", () => {
    it("displays max bid and winning indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      expect(wrapper.text()).toContain("Your max: $15,000")
      expect(wrapper.find(WinningBid).length).toBe(1)
    })
  })

  describe("for open auction with my bid losing", () => {
    it("displays max bid and losing indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithMyLosingBid)

      expect(wrapper.text()).toContain("Your max: $400")
      expect(wrapper.find(LosingBid).length).toBe(1)
    })
  })

  describe("for open auction with me increasing my max bid while winning", () => {
    it("displays max bid and winning indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNotMetIncreasingOwnBid)

      expect(wrapper.text()).toContain("Your max: $15,000")
      expect(wrapper.find(WinningBid).length).toBe(1)
    })
  })
})
