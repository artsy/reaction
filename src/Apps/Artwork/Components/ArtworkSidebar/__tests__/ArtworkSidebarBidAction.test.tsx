import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { ArtworkSidebarBidActionFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import { renderRelayTree } from "DevTools"
import { merge as _merge } from "lodash"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const merge: (...args: object[]) => any = _merge

describe("ArtworkSidebarBidAction", () => {
  const getWrapper = async response => {
    return await renderRelayTree({
      Component: ArtworkSidebarBidActionFragmentContainer,
      query: graphql`
        query ArtworkSidebarBidAction_Test_Query {
          artwork(id: "auction_artwork") {
            ...ArtworkSidebarBidAction_artwork
          }
        }
      `,
      mockResolvers: {
        Artwork: () => response,
      },
    })
  }

  describe("for closed auction", () => {
    it("does not display anything", async () => {
      const wrapper = await getWrapper(ArtworkFromClosedAuction)

      expect(wrapper.html()).toBe(null)
    })
  })

  describe("for auction preview", () => {
    it("and not registered bidder", async () => {
      const wrapper = await getWrapper(ArtworkFromAuctionPreview)

      expect(wrapper.text()).toContain("Register to bid")
    })

    it("with bidder registration pending approval", async () => {
      const artwork = merge(
        {},
        ArtworkFromAuctionPreview,
        BidderPendingApproval
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Registration pending")
    })

    it("with registered bidder", async () => {
      const artwork = merge({}, ArtworkFromAuctionPreview, RegisteredBidder)
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Registration complete")
    })
  })

  describe("for open auction", () => {
    it("with open registration and not registered bidder ", async () => {
      const artwork = merge(
        {},
        ArtworkFromTimedAuctionRegistrationOpen,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Bid")
    })

    it("with closed registration and not registered bidder ", async () => {
      const artwork = merge(
        {},
        ArtworkFromTimedAuctionRegistrationClosed,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Registration closed")
    })

    it("with bidder registration pending approval", async () => {
      const artwork = merge(
        {},
        ArtworkFromTimedAuctionRegistrationOpen,
        BidderPendingApproval
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Registration pending")
    })

    it("with registered bidder", async () => {
      const artwork = merge(
        {},
        ArtworkFromTimedAuctionRegistrationOpen,
        RegisteredBidder
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Bid")
    })

    it("with registered bidder with bids", async () => {
      const artwork = merge(
        {},
        ArtworkFromTimedAuctionRegistrationOpen,
        RegistedBidderWithBids
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Increase max bid")
    })
  })

  describe("for live auction", () => {
    it("with open registration and not registered bidder ", async () => {
      const artwork = merge(
        {},
        ArtworkFromLiveAuctionRegistrationOpen,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Enter live bidding")
    })

    it("with closed registration and not registered bidder ", async () => {
      const artwork = merge(
        {},
        ArtworkFromLiveAuctionRegistrationClosed,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Registration closed")
      expect(wrapper.text()).toContain("Watch live bidding")
    })

    it("with bidder registration pending approval", async () => {
      const artwork = merge(
        {},
        ArtworkFromLiveAuctionRegistrationOpen,
        BidderPendingApproval
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Enter live bidding")
    })

    it("with registered bidder", async () => {
      const artwork = merge(
        {},
        ArtworkFromLiveAuctionRegistrationOpen,
        RegisteredBidder
      )
      const wrapper = await getWrapper(artwork)

      expect(wrapper.text()).toContain("Enter live bidding")
    })
  })
})
