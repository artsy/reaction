jest.mock("Apps/Auction/Routes/ConfirmBid/BidderPositionQuery", () => ({
  bidderPositionQuery: jest.fn(),
}))

import deepMerge from "deepmerge"
import { createTestEnv } from "DevTools/createTestEnv"
import React from "react"
import { graphql } from "react-relay"

import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import { ConfirmBidQueryResponseFixture } from "Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import { bidderPositionQuery } from "Apps/Auction/Routes/ConfirmBid/BidderPositionQuery"
import { AnalyticsSchema } from "Artsy/Analytics"
import { TrackingProp } from "react-tracking"
import {
  confirmBidBidderPositionQueryWithPending,
  confirmBidBidderPositionQueryWithWinning,
  createBidderPositionFailed,
  createBidderPositionSuccessful,
} from "../__fixtures__/MutationResults/createBidderPosition"
import { ConfirmBidRouteFragmentContainer } from "../ConfirmBid"
import { ConfirmBidTestPage } from "./Utils/ConfirmBidTestPage"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockBidderPositionQuery = bidderPositionQuery as jest.Mock
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const mockLocation: Partial<Location> = {
  search: "",
}

const setupTestEnv = ({
  location = mockLocation,
}: {
  location?: Partial<Location>
} = {}) => {
  return createTestEnv({
    TestPage: ConfirmBidTestPage,
    Component: (
      props: routes_ConfirmBidQueryResponse & { tracking: TrackingProp }
    ) => (
      <ConfirmBidRouteFragmentContainer
        location={location as Location}
        {...props}
      />
    ),
    query: graphql`
      query ConfirmBidValidTestQuery {
        artwork(id: "artwork-id") {
          ...LotInfo_artwork
          _id
          id
          saleArtwork: sale_artwork(sale_id: "example-auction-id") {
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
            _id
            id
            sale {
              registrationStatus {
                id
                qualified_for_bidding
              }
              _id
              id
              name
              is_closed
              is_registration_closed
            }
          }
        }
        me {
          ...BidForm_me
          id
          has_qualified_credit_cards
        }
      }
    `,
    defaultData: ConfirmBidQueryResponseFixture,
    defaultMutationResults: {
      createBidderPosition: {},
    },
  })
}

describe("Routes/ConfirmBid", () => {
  beforeEach(() => {
    window.location.assign = jest.fn()
    window.location.search = ""
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("for registered users", () => {
    it("allows the user to place a bid without agreeing to terms", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionSuccessful)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithPending
      )

      await page.submitForm()

      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artwork_id: "artworkslug",
            max_bid_amount_cents: 5000000,
            sale_id: "saleslug",
          },
        }
      )

      expect(mockBidderPositionQuery).toHaveBeenCalledTimes(1)
      expect(mockBidderPositionQuery.mock.calls[0][1]).toEqual({
        bidderPositionID: "positionid",
      })

      mockBidderPositionQuery.mockReset()
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      setTimeout(() => {
        expect(mockBidderPositionQuery).toHaveBeenCalledTimes(1)
        expect(mockBidderPositionQuery.mock.calls[0][1]).toEqual({
          bidderPositionID: "pending-bidder-position-id-from-polling",
        })

        expect(window.location.assign).toHaveBeenCalledWith(
          `https://example.com/artwork/${
            ConfirmBidQueryResponseFixture.artwork.id
          }`
        )
        done()
      }, 1001)
    })

    it("tracks a success event to Segment including Criteo info", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessful)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.submitForm()

      setTimeout(() => {
        expect(mockPostEvent).toHaveBeenCalledTimes(1)
        expect(mockPostEvent).toHaveBeenCalledWith({
          action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
          context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
          auction_slug: "saleslug",
          artwork_slug: "artworkslug",
          bidder_id: "bidderid",
          bidder_position_id: "winning-bidder-position-id-from-polling",
          sale_id: "saleid",
          user_id: "my-user-id",
          order_id: "bidderid",
          products: [
            {
              product_id: "artworkid",
              quantity: 1,
              price: 50000,
            },
          ],
        })
        done()
      }, 1001)
    })

    it("send an error event to analytics if the mutation fails", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.submitForm()

      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artwork_id: "artworkslug",
            max_bid_amount_cents: 5000000,
            sale_id: "saleslug",
          },
        }
      )

      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["ConfirmBidCreateBidderPositionMutation failed"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "bidderid",
        sale_id: "saleid",
        user_id: "my-user-id",
      })
      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(window.location.assign).not.toHaveBeenCalled()
    })
  })

  describe("for unregistered users with a credit card on file", () => {
    const FixtureForUnregisteredUserWithCreditCard = deepMerge(
      ConfirmBidQueryResponseFixture,
      {
        me: {
          has_qualified_credit_cards: true,
        },
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
            },
          },
        },
      }
    )

    it("allows the user to place a bid after agreeing to terms", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })

      // env.mutations.useResultsOnce(createBidderPositionSuccessful)
      // mockBidderPositionQuery.mockResolvedValue(confirmBidBidderPositionQueryWithPending)

      await page.agreeToTerms()
      // await page.submitForm()

      // TODO: Uncomment once https://artsyproduct.atlassian.net/browse/AUCT-716 is fixed.
      // expect(env.mutations.mockFetch).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     name: "ConfirmBidCreateBidderPositionMutation",
      //   }),
      //   {
      //     input: {
      //       artwork_id: "artworkslug",
      //       max_bid_amount_cents: 5000000,
      //       sale_id: "saleslug",
      //     },
      //   }
      // )
    })

    it("displays an error when user did not agree to terms but tried to submit", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })

      await page.submitForm()

      expect(env.mutations.mockFetch).not.toBeCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain("You must agree to the Conditions of Sale")
    })
  })

  describe("preselected bid amounts", () => {
    it("pre-fills the bid select box with a value from the query string that is available in increments", async () => {
      const specialSelectedBidAmount = "7000000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe(
        specialSelectedBidAmount
      )
    })

    it("pre-fills the bid select box with the highest increment if the value is higher than what is available", async () => {
      const specialSelectedBidAmount = "42000000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })

    it("pre-fills the bid select box with the lowest increment if the value is lower than what is available", async () => {
      const specialSelectedBidAmount = "420000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })

    it("pre-fills the bid select box with the lowest increment if the value is not a number", async () => {
      const specialSelectedBidAmount = "50 thousand and 00/100 dollars"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })
  })
})
