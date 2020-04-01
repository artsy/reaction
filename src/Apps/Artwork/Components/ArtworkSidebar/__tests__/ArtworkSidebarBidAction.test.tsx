import { ArtworkSidebarBidAction_Test_QueryRawResponse } from "__generated__/ArtworkSidebarBidAction_Test_Query.graphql"
import {
  ArtworkFromAuctionPreview,
  ArtworkFromClosedAuction,
  ArtworkFromLiveAuctionRegistrationClosed,
  ArtworkFromLiveAuctionRegistrationOpen,
  ArtworkFromTimedAuctionRegistrationClosed,
  ArtworkFromTimedAuctionRegistrationOpen,
  BidderPendingApproval,
  IDVedUser,
  NotIDVedUser,
  NotRegisteredToBid,
  RegistedBidderWithBids,
  RegisteredBidder,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarBidAction"
import { ArtworkSidebarBidActionFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBidAction"
import { renderRelayTree } from "DevTools"
import { merge as _merge } from "lodash"
import { graphql } from "react-relay"

jest.unmock("react-relay")

// TODO: Can we make this typed?
const merge: (...args: object[]) => any = _merge

describe("ArtworkSidebarBidAction", () => {
  const getWrapper = async (
    response: ArtworkSidebarBidAction_Test_QueryRawResponse
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarBidActionFragmentContainer,
      query: graphql`
        query ArtworkSidebarBidAction_Test_Query @raw_response_type {
          artwork(id: "auction_artwork") {
            ...ArtworkSidebarBidAction_artwork
          }
          me {
            ...ArtworkSidebarBidAction_me
          }
        }
      `,
      mockData: {
        artwork: response.artwork,
        me: response.me,
      } as ArtworkSidebarBidAction_Test_QueryRawResponse,
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
      const wrapper = await getWrapper({
        artwork: ArtworkFromAuctionPreview,
        me: NotIDVedUser,
      })

      expect(wrapper.text()).toContain("Register to bid")
    })

    it("with bidder registration pending approval", async () => {
      const artwork: ArtworkSidebarBidAction_Test_QueryRawResponse["artwork"] = merge(
        {}, // why the empty object
        ArtworkFromAuctionPreview,
        BidderPendingApproval
      )
      const wrapper = await getWrapper({
        artwork,
        me: NotIDVedUser,
      })

      expect(wrapper.text()).toContain("Registration pending")
    })

    it("with registered bidder", async () => {
      const artwork = merge({}, ArtworkFromAuctionPreview, RegisteredBidder)
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Registration complete")
    })

    describe("when the sale requires identity verification", () => {
      describe("when there is no logged in user", () => {
        it.todo("displays a 'Register to bid' button, not a 'Bid' button")
        it.todo("displays 'Identity verification required to bid.'")
      })
      describe("when there is a logged in user", () => {
        describe("when the user has not attempted to register to bid", () => {
          describe("when the user is identity verified", () => {
            it("does not display 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid
              )

              const wrapper = await getWrapper({
                artwork,
                me: IDVedUser,
              })

              expect(wrapper.text()).not.toContain(
                "Identity verification required to bid."
              )
            })
          })
          describe("when the user is not identity verified", () => {
            it("displays 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid
              )

              const wrapper = await getWrapper({
                artwork,
                me: NotIDVedUser,
              })

              expect(wrapper.text()).toContain(
                "Identity verification required to bid."
              )
            })
            it("displays a 'Register to bid' button", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid
              )

              const wrapper = await getWrapper({
                artwork,
                me: NotIDVedUser,
              })

              expect(wrapper.text()).toContain("Register to bid")
            })
          })
        })
        describe("when the user has attempted to register to bid", () => {
          describe("when the user is identity verified", () => {
            it.todo("displays a 'Bid' button, not a 'Register to Bid' button")
            it.todo("does not display 'Identity verification required to bid.'")
            it.todo("does not display a FAQ link")
          })
          describe("when the user is not identity verified", () => {
            it("displays 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                BidderPendingApproval
              )

              const wrapper = await getWrapper({
                artwork,
                me: NotIDVedUser,
              })

              expect(wrapper.text()).toContain(
                "Identity verification required to bid."
              )
            })
          })
        })
      })
    })
  })

  describe("for open auction", () => {
    it("with open registration and not registered bidder ", async () => {
      const artwork = merge(
        ArtworkFromTimedAuctionRegistrationOpen,
        NotRegisteredToBid
      )
      const data: ArtworkSidebarBidAction_Test_QueryRawResponse = {
        artwork,
        me: NotIDVedUser,
      }
      const wrapper = await getWrapper(data)

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Bid")
    })

    it("with closed registration and not registered bidder ", async () => {
      const artwork = merge(
        ArtworkFromTimedAuctionRegistrationClosed,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper({
        artwork,
        me: NotIDVedUser,
      })

      expect(wrapper.text()).toContain("Registration closed")
    })

    it("with bidder registration pending approval", async () => {
      const artwork = merge(
        ArtworkFromTimedAuctionRegistrationOpen,
        BidderPendingApproval
      )
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Registration pending")
    })

    it("with registered bidder", async () => {
      const artwork = merge(
        ArtworkFromTimedAuctionRegistrationOpen,
        RegisteredBidder
      )
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Bid")
    })

    it("with registered bidder with bids", async () => {
      const artwork = merge(
        ArtworkFromTimedAuctionRegistrationOpen,
        RegistedBidderWithBids
      )
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Place max bid")
      expect(wrapper.text()).toContain("$900")
      expect(wrapper.text()).toContain("Increase max bid")
    })
  })

  describe("for live auction", () => {
    it("with open registration and not registered bidder ", async () => {
      const artwork = merge(
        ArtworkFromLiveAuctionRegistrationOpen,
        NotRegisteredToBid
      )
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Enter live bidding")
    })

    it("with closed registration and not registered bidder ", async () => {
      const artwork = merge(
        ArtworkFromLiveAuctionRegistrationClosed,
        NotRegisteredToBid
      )

      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Registration closed")
      expect(wrapper.text()).toContain("Watch live bidding")
    })

    it("with bidder registration pending approval", async () => {
      const artwork = merge(
        ArtworkFromLiveAuctionRegistrationOpen,
        BidderPendingApproval
      )

      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Enter live bidding")
    })

    it("with registered bidder", async () => {
      const artwork = merge(
        ArtworkFromLiveAuctionRegistrationOpen,
        RegisteredBidder
      )
      const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

      expect(wrapper.text()).toContain("Enter live bidding")
    })
  })
})
