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
  NoUser,
  RegistedBidderWithBids,
  RegisteredBidder,
  SaleRequiringIDV,
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
      const artwork = merge(ArtworkFromAuctionPreview, BidderPendingApproval)
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
      const SaleWithArtwork = merge(ArtworkFromAuctionPreview, {
        sale: SaleRequiringIDV,
      })

      describe("when there is no logged in user", () => {
        it("displays a 'Register to bid' button, not a 'Bid' button", async () => {
          const me = NoUser
          const artwork = merge(SaleWithArtwork, NotRegisteredToBid)

          const wrapper = await getWrapper({ artwork, me })

          expect(wrapper.text()).toContain("Register to bid")
        })

        it("displays 'Identity verification required to bid.'", async () => {
          const me = NoUser
          const artwork = merge(SaleWithArtwork, NotRegisteredToBid)

          const wrapper = await getWrapper({ artwork, me })

          expect(wrapper.text()).toContain(
            "Identity verification required to bid."
          )
        })
      })
      describe("when there is a logged in user", () => {
        describe("when the user has not attempted to register to bid", () => {
          describe("when the user is identity verified", () => {
            it("does not display 'Identity verification required to bid.'", async () => {
              const artwork = merge(SaleWithArtwork, NotRegisteredToBid)
              const me = IDVedUser
              const wrapper = await getWrapper({ artwork, me })

              expect(wrapper.text()).not.toContain(
                "Identity verification required to bid."
              )
            })
          })

          describe("when the user is not identity verified", () => {
            it("displays 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid,
                {
                  sale: SaleRequiringIDV,
                }
              )
              const me = NotIDVedUser
              const wrapper = await getWrapper({ artwork, me })

              expect(wrapper.text()).toContain(
                "Identity verification required to bid."
              )
            })

            it("displays a 'Register to bid' button", async () => {
              const artwork = merge(
                ArtworkFromAuctionPreview,
                NotRegisteredToBid,
                {
                  sale: SaleRequiringIDV,
                }
              )
              const me = NotIDVedUser
              const wrapper = await getWrapper({ artwork, me })

              expect(wrapper.text()).toContain("Register to bid")
            })
          })
        })

        describe("when the user has attempted to register to bid", () => {
          describe("when the user is identity verified", () => {
            it("does not display 'Identity verification required to bid.'", async () => {
              const artwork = merge(SaleWithArtwork, BidderPendingApproval)
              const me = IDVedUser
              const wrapper = await getWrapper({ artwork, me })

              expect(wrapper.text()).not.toContain(
                "Identity verification required to bid."
              )
            })
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

  describe("for an online-only (timed) auction", () => {
    describe("with registration open", () => {
      it("allows the user to place a max bid when the user has not tried to register", async () => {
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

      it("allows the user to place a max bid when the user is a registered bidder", async () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          RegisteredBidder
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Place max bid")
        expect(wrapper.text()).toContain("$900")
        expect(wrapper.text()).toContain("Bid")
      })

      it("allows the user to increase their max bid after an initial max bid", async () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          RegistedBidderWithBids
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Place max bid")
        expect(wrapper.text()).toContain("$900")
        expect(wrapper.text()).toContain("Increase max bid")
      })

      it("displays 'Registration Pending' when the user is a pending bidder", async () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationOpen,
          BidderPendingApproval
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Registration pending")
      })

      describe("when the sale requires identity verification", () => {
        describe("when the user is not identity verified", () => {
          describe("when user has not tried to register", () => {
            it("allows user to 'Register to bid', but not place a max bid", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                NotRegisteredToBid,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).toContain("Register to bid")
              expect(wrapper.text()).not.toContain("Place max bid")
            })

            it("displays 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                NotRegisteredToBid,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).toContain(
                "Identity verification required to bid."
              )
            })
          })

          describe("when the user is a pending bidder", () => {
            it("displays 'Registration Pending'", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                BidderPendingApproval,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).toContain("Registration pending")
            })

            it("displays 'Identity verification required to bid.'", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                BidderPendingApproval,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).toContain(
                "Identity verification required to bid."
              )
            })
          })

          describe("corner case: when the bidder is approved (bidder manually approved by admin)", () => {
            it("allows the user to bid", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                RegisteredBidder,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).toContain("Place max bid")
              expect(wrapper.text()).toContain("$900")
              expect(wrapper.text()).toContain("Place max bid")
            })

            it("does not display anything about identity verification", async () => {
              const artwork = merge(
                ArtworkFromTimedAuctionRegistrationOpen,
                RegisteredBidder,
                { sale: SaleRequiringIDV }
              )

              const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

              expect(wrapper.text()).not.toContain(
                "Identity verification required to bid."
              )
            })
          })
        })
        describe("when the user is identity verified", () => {
          it("does not display anything about identity verification", async () => {
            const artwork = merge(
              ArtworkFromTimedAuctionRegistrationOpen,
              NotRegisteredToBid,
              { sale: SaleRequiringIDV }
            )

            const wrapper = await getWrapper({ artwork, me: IDVedUser })

            expect(wrapper.text()).not.toContain(
              "Identity verification required to bid."
            )
          })
        })
      })
    })

    describe("with registration closed", () => {
      it("displays 'Registration Closed' and doesn't allow the user to bid unless already registered", async () => {
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

      it("allows users to place bids if they are already a registered bidder", async () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationClosed,
          RegisteredBidder
        )
        const wrapper = await getWrapper({
          artwork,
          me: NotIDVedUser,
        })

        expect(wrapper.text()).toContain("Place max bid")
        expect(wrapper.text()).toContain("$900")
        expect(wrapper.text()).toContain("Bid")
      })

      it("does not display anything about identity verification even if sale requires it and user is not identity verified", async () => {
        const artwork = merge(
          ArtworkFromTimedAuctionRegistrationClosed,
          NotRegisteredToBid,
          { sale: SaleRequiringIDV }
        )

        const wrapper = await getWrapper({
          artwork,
          me: NotIDVedUser,
        })

        expect(wrapper.text()).not.toContain(
          "Identity verification required to bid."
        )
      })
    })
  })

  describe("for live auction", () => {
    describe("when user is not registered to bid and registration is open", () => {
      it("displays that the user can enter live bidding", async () => {
        const artwork = merge(
          ArtworkFromLiveAuctionRegistrationOpen,
          NotRegisteredToBid
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Enter live bidding")
      })
    })

    describe("when user is not registered to bid and registration is closed", () => {
      it("displays that registration is closed, but user can watch live bidding", async () => {
        const artwork = merge(
          ArtworkFromLiveAuctionRegistrationClosed,
          NotRegisteredToBid
        )

        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Registration closed")
        expect(wrapper.text()).toContain("Watch live bidding")
      })
    })

    // TODO: This behavior that this test is testing seems wrong. If the bidder
    // is pending approval, they won't be qualified for bidding and therefore can't
    // bid yet...
    describe("when the user is pending bidder approval and registration is still open", () => {
      it("[confirm me] displays that the user can enter live bidding", async () => {
        const artwork = merge(
          ArtworkFromLiveAuctionRegistrationOpen,
          BidderPendingApproval
        )

        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Enter live bidding")
      })
    })
    describe("when user is registered to bid and registration is still open", () => {
      it("displays that the user can enter live bidding", async () => {
        const artwork = merge(
          ArtworkFromLiveAuctionRegistrationOpen,
          RegisteredBidder
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Enter live bidding")
      })
    })
    describe("most common for live auctions: when user is registered to bid and registration is closed", () => {
      it("displays that the user can enter live bidding", async () => {
        const artwork = merge(
          ArtworkFromLiveAuctionRegistrationClosed,
          RegisteredBidder
        )
        const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

        expect(wrapper.text()).toContain("Enter live bidding")
      })
    })

    describe("when the sale requires identity verification", () => {
      describe("when registration is open", () => {
        describe("when the user is not identity verified", () => {
          it("displays that identity verification is required to bid", async () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationOpen,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid
            )

            const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

            expect(wrapper.text()).toContain(
              "Identity verification required to bid."
            )
          })
        })

        describe("when user is identity verified", () => {
          it("does not display that identity verification is required to bid", async () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationOpen,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid
            )

            const wrapper = await getWrapper({ artwork, me: IDVedUser })

            expect(wrapper.text()).not.toContain(
              "Identity verification required to bid."
            )
          })
        })
      })

      describe("when registration is closed", () => {
        describe("when the user is identity verified", () => {
          it("does not display that identity verification is required to bid", async () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationClosed,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid
            )

            const wrapper = await getWrapper({ artwork, me: IDVedUser })

            expect(wrapper.text()).not.toContain(
              "Identity verification required to bid."
            )
          })
        })

        describe("when the user is not identity verified", () => {
          it("does not display that identity verification is required to bid", async () => {
            const artwork = merge(
              ArtworkFromLiveAuctionRegistrationClosed,
              { sale: SaleRequiringIDV },
              NotRegisteredToBid
            )

            const wrapper = await getWrapper({ artwork, me: NotIDVedUser })

            expect(wrapper.text()).not.toContain(
              "Identity verification required to bid."
            )
          })
        })
      })
    })
  })
})
