import {
  createCreditCardAndUpdatePhoneFailed,
  createCreditCardAndUpdatePhoneSuccessful,
} from "../__fixtures__/MutationResults/createCreditCardAndUpdatePhone"

jest.mock("Apps/Auction/Routes/ConfirmBid/BidderPositionQuery", () => ({
  bidderPositionQuery: jest.fn(),
}))

jest.mock("react-stripe-elements", () => {
  const stripeMock = {
    createToken: jest.fn(),
  }

  return {
    Elements: ({ children }) => children,
    StripeProvider: ({ children }) => children,
    CardElement: ({ onReady, hidePostalCode, ...props }) => <div {...props} />,
    __stripeMock: stripeMock,
    injectStripe: Component => props => (
      <Component stripe={stripeMock} {...props} />
    ),
  }
})

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
  confirmBidBidderPositionQueryWithOutbid,
  confirmBidBidderPositionQueryWithPending,
  confirmBidBidderPositionQueryWithWinning,
  createBidderPositionFailed,
  createBidderPositionSuccessful,
  createBidderPositionSuccessfulAndBidder,
} from "../__fixtures__/MutationResults/createBidderPosition"
import { stripeTokenResponse } from "../__fixtures__/Stripe"
import { ConfirmBidRouteFragmentContainer } from "../ConfirmBid"
import { ConfirmBidTestPage } from "./Utils/ConfirmBidTestPage"
import { ValidFormValues } from "./Utils/RegisterTestPage"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockBidderPositionQuery = bidderPositionQuery as jest.Mock
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock
const createTokenMock = require("react-stripe-elements").__stripeMock
  .createToken as jest.Mock

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
          id
          ...ConfirmBid_me
        }
      }
    `,
    defaultData: ConfirmBidQueryResponseFixture,
    defaultMutationResults: {
      createBidderPosition: {},
      createCreditCard: {},
      updateMyUserProfile: {},
    },
  })
}

describe("Routes/ConfirmBid", () => {
  beforeEach(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

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

    it("tracks a success event to Segment including Criteo info", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessful)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "existing-bidder-id",
        bidder_position_id: "winning-bidder-position-id-from-polling",
        sale_id: "saleid",
        user_id: "my-user-id",
        order_id: "existing-bidder-id",
        products: [
          {
            product_id: "artworkid",
            quantity: 1,
            price: 50000,
          },
        ],
      })
    })

    it("displays an error message when the mutation returns a GraphQL error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.submitForm()

      expect(page.text()).toContain("Sale Closed to Bids.")
      expect(window.location.assign).not.toHaveBeenCalled()
    })

    it("displays an error message when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.mockNetworkFailureOnce()

      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain(
        "Please make sure your internet connection is active and try again"
      )
    })

    it("displays an error message when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain("Your bid wasn’t high enough.")
    })

    it("tracks an error when the mutation returns a GraphQL error", async () => {
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

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Sale Closed to Bids"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "existing-bidder-id",
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.mockNetworkFailureOnce()

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: failed to fetch"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "existing-bidder-id",
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Your bid wasn’t high enough"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "existing-bidder-id",
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })
  })

  describe("for unregistered users with a credit card on file", () => {
    const FixtureForUnregisteredUserWithCreditCard = deepMerge(
      ConfirmBidQueryResponseFixture,
      {
        me: {
          hasQualifiedCreditCards: true,
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

      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.agreeToTerms()
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
    })

    it("tracks a success event to Segment including Criteo info", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "new-bidder-id",
        bidder_position_id: "winning-bidder-position-id-from-polling",
        sale_id: "saleid",
        user_id: "my-user-id",
        order_id: "new-bidder-id",
        products: [
          {
            product_id: "artworkid",
            quantity: 1,
            price: 50000,
          },
        ],
      })
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

    it("tracks an error without bidder id when the mutation returns a GraphQL error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Sale Closed to Bids"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: null,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error without bidder id when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.mockNetworkFailureOnce()

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: failed to fetch"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: null,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error with bidder id when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Your bid wasn’t high enough"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: "new-bidder-id",
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })
  })

  describe("for unregistered users without credit cards", () => {
    const FixtureForUnregisteredUserWithoutCreditCard = deepMerge(
      ConfirmBidQueryResponseFixture,
      {
        me: {
          hasQualifiedCreditCards: false,
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
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      createTokenMock.mockResolvedValue(stripeTokenResponse)
      env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneSuccessful)
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValue(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(createTokenMock).toHaveBeenCalledWith({
        address_city: "New York",
        address_country: "United States",
        address_line1: "123 Example Street",
        address_line2: "Apt 1",
        address_state: "NY",
        address_zip: "10012",
        name: "Example Name",
      })
      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "RegisterCreateCreditCardAndUpdatePhoneMutation",
        }),
        {
          creditCardInput: { token: "tok_abcabcabcabcabcabcabc" },
          profileInput: { phone: "+1 555 212 7878" },
        }
      )
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
      expect(window.location.assign).toHaveBeenCalledWith(
        `https://example.com/artwork/${
          ConfirmBidQueryResponseFixture.artwork.id
        }`
      )
    })

    it("displays an error when user did not add his/her address", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      createTokenMock.mockResolvedValue(stripeTokenResponse)

      const address = Object.assign({}, ValidFormValues)
      address.phoneNumber = "    "

      await page.fillAddressForm(address)
      await page.agreeToTerms()
      await page.submitForm()

      expect(page.text()).toMatch("Telephone is required")
      expect(env.mutations.mockFetch).not.toBeCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
    })

    it("displays an error when Stripe returns an error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      createTokenMock.mockResolvedValue({ error: { message: "Card inlivad" } })

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain(
        "Please make sure your internet connection is active and try again"
      )

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: Stripe error: Card inlivad"],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: null,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("displays an error when CreateCreditCardAndUpdatePhoneMutation returns an error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      createTokenMock.mockResolvedValue(stripeTokenResponse)
      env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneFailed)

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain(
        "Please make sure your internet connection is active and try again"
      )

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: [
          "JavaScript error: The `createCreditCard` mutation failed.",
        ],
        auction_slug: "saleslug",
        artwork_slug: "artworkslug",
        bidder_id: null,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
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
