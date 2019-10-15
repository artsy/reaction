import React from "react"
import { graphql } from "react-relay"

import { createTestEnv } from "DevTools/createTestEnv"

import { routes_BidQueryResponse } from "__generated__/routes_BidQuery.graphql"
import { BidQueryResponseFixture } from "Apps/Auction/__fixtures__/routes_BidQuery"
import { createBidderPositionSuccessful } from "../__fixtures__/MutationResults/createBidderPosition"
import { ConfirmBidRouteFragmentContainer } from "../ConfirmBid"
import { ConfirmBidTestPage } from "./Utils/ConfirmBidTestPage"

jest.unmock("react-relay")

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const mockLocation: any = {
  search: "",
}

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: ConfirmBidTestPage,
    Component: (props: routes_BidQueryResponse) => (
      <ConfirmBidRouteFragmentContainer location={mockLocation} {...props} />
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
    defaultData: BidQueryResponseFixture,
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
        BidQueryResponseFixture.artwork.saleArtwork.sale.id
      }/artwork/${BidQueryResponseFixture.artwork.id}`
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
})
