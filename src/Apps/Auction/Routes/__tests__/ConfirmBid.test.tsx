import deepMerge from "deepmerge"
import { createTestEnv } from "DevTools/createTestEnv"
import React from "react"
import { graphql } from "react-relay"

import { routes_ConfirmBidQueryResponse } from "__generated__/routes_ConfirmBidQuery.graphql"
import {
  ConfirmBidQueryResponse,
  ConfirmBidQueryResponseFixture,
} from "Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import { DeepPartial } from "Utils/typeSupport"
import { createBidderPositionSuccessful } from "../__fixtures__/MutationResults/createBidderPosition"
import { ConfirmBidRouteFragmentContainer } from "../ConfirmBid"
import { ConfirmBidTestPage } from "./Utils/ConfirmBidTestPage"

jest.unmock("react-relay")

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const mockLocation: Partial<Location> = {
  search: "",
}

const mockDefaultData = (
  data: DeepPartial<ConfirmBidQueryResponse> = {}
): ConfirmBidQueryResponse =>
  deepMerge<ConfirmBidQueryResponse, DeepPartial<ConfirmBidQueryResponse>>(
    ConfirmBidQueryResponseFixture,
    data
  )

const setupTestEnv = ({
  location = mockLocation,
  data = {},
}: { location?: Partial<Location>; data?: any } = {}) => {
  return createTestEnv({
    TestPage: ConfirmBidTestPage,
    Component: (props: routes_ConfirmBidQueryResponse) => (
      <ConfirmBidRouteFragmentContainer location={location as any} {...props} />
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
          has_qualified_credit_cards
        }
      }
    `,
    defaultData: mockDefaultData({}),
    defaultMutationResults: {
      createBidderPosition: {},
    },
  })
}

describe("Routes/Register ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}
  })

  beforeEach(() => {
    window.location.assign = jest.fn()
    window.location.search = ""
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("successfully places a bid and redirect to artwork page", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    env.mutations.useResultsOnce(createBidderPositionSuccessful)

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

    expect(window.location.assign).toHaveBeenCalledWith(
      `https://example.com/auction/${
        ConfirmBidQueryResponseFixture.artwork.saleArtwork.sale.id
      }/artwork/${ConfirmBidQueryResponseFixture.artwork.id}`
    )
  })

  it("requires user to agree to terms", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    await page.submitForm()

    expect(env.mutations.mockFetch).not.toBeCalled()
    expect(window.location.assign).not.toHaveBeenCalled()
    expect(page.text()).toContain("You must agree to the Conditions of Sale")
  })

  describe("preselected bid amounts", () => {
    it("pre-fills the bid select box with a value from the query string that is available in increments", async () => {
      const specialSelectedBidAmount = "7000000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              increments: [
                { cents: 5000000, display: "$50,000" },
                { cents: 6000000, display: "$60,000" },
                { cents: 7000000, display: "$70,000" },
              ],
            },
          },
        }),
      })
      expect(page.selectBidAmountInput.props().value).toBe(
        specialSelectedBidAmount
      )
    })
    it("pre-fills the bid select box with the highest increment if the value is higher than what is available", async () => {
      const specialSelectedBidAmount = "42000000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              increments: [
                { cents: 5000000, display: "$50,000" },
                { cents: 6000000, display: "$60,000" },
                { cents: 7000000, display: "$70,000" },
              ],
            },
          },
        }),
      })
      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })
    it("pre-fills the bid select box with the lowest increment if the value is lower than what is available", async () => {
      const specialSelectedBidAmount = "420000"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              increments: [
                { cents: 5000000, display: "$50,000" },
                { cents: 6000000, display: "$60,000" },
                { cents: 7000000, display: "$70,000" },
              ],
            },
          },
        }),
      })
      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })

    it("pre-fills the bid select box with the lowest increment if the value is not a number", async () => {
      const specialSelectedBidAmount = "50 thousand and 00/100 dollars"
      const search = `?bid=${specialSelectedBidAmount}`
      const env = setupTestEnv({ location: { search } })
      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              increments: [
                { cents: 5000000, display: "$50,000" },
                { cents: 6000000, display: "$60,000" },
                { cents: 7000000, display: "$70,000" },
              ],
            },
          },
        }),
      })
      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })
  })
})
