import {
  ConfirmBidQueryResponse,
  ConfirmBidQueryResponseFixture,
} from "Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import {
  DeFragedRegisterQueryResponse,
  RegisterQueryResponseFixture,
} from "Apps/Auction/__fixtures__/routes_RegisterQuery"
import { routes } from "Apps/Auction/routes"
import deepMerge from "deepmerge"
import { createMockNetworkLayer2 } from "DevTools/createMockNetworkLayer"
import { createRender } from "found"
import { Resolver } from "found-relay"
import getFarceResult from "found/lib/server/getFarceResult"
import { Environment, RecordSource, Store } from "relay-runtime"
import { DeepPartial } from "Utils/typeSupport"

describe("Auction/routes", () => {
  async function render(url, mockData) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: createRender({}),
    })
  }

  const mockRegisterResolver = (
    data: DeFragedRegisterQueryResponse
  ): DeFragedRegisterQueryResponse => ({
    sale: data.sale,
    me: data.me,
  })

  const mockConfirmBidResolver = (
    data: DeepPartial<ConfirmBidQueryResponse> = {}
  ): ConfirmBidQueryResponse =>
    deepMerge<ConfirmBidQueryResponse, DeepPartial<ConfirmBidQueryResponse>>(
      ConfirmBidQueryResponseFixture,
      data
    )

  it("renders the Auction FAQ view", async () => {
    const { status } = await render("/auction-faq", {})

    expect(status).toBe(200)
  })

  describe("Confirm Bid: /:saleId/bid/:artworkId", () => {
    it("does not redirect if the user is qualified to bid in the sale, the sale is open, and the artwork is biddable", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver()
      const { redirect, status } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })

    it("redirects to confirm registration page if user is registered but not qualified to bid (to remind them)", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: { registrationStatus: { qualified_for_bidding: false } },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )

      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/confirm-registration`
      )
    })

    it("redirects to sale artwork page if the sale is closed", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              is_closed: true,
            },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )
      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/artwork/${
          fixture.artwork.id
        }`
      )
    })

    it("redirects to the login (plus redirect_uri of sale artwork bid page) if user is not signed in", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver({
        me: null,
      })

      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )
      expect(redirect.url).toBe(
        "/log_in?redirect_uri=%2Fauction%2Fsaleslug%2Fbid%2Fartworkslug"
      )
    })

    it("redirects to the sale artwork page if user is not registered and registration is closed", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
              is_registration_closed: true,
            },
          },
        },
      })
      const { redirect } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )
      expect(redirect.url).toBe(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/artwork/${
          fixture.artwork.id
        }`
      )
    })

    it("does not redirect if user is not registered but registration is open", async () => {
      const fixture: ConfirmBidQueryResponse = mockConfirmBidResolver({
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
              is_registration_closed: false,
            },
          },
        },
      })
      const { redirect, status } = await render(
        `/auction/${fixture.artwork.saleArtwork.sale.id}/bid/${
          fixture.artwork.id
        }`,
        fixture
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })
  })

  describe("Register: /auction-registration/:saleId", () => {
    it("does not redirect if a sale is found", async () => {
      const { redirect, status } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.id}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
      expect(redirect).toBeUndefined
    })

    it("also responds to auction-registration2 route", async () => {
      const { status } = await render(
        `/auction-registration2/${RegisterQueryResponseFixture.sale.id}`,
        mockRegisterResolver(RegisterQueryResponseFixture)
      )

      expect(status).toBe(200)
    })

    it("redirects to the auction registration modal if the user has a qualified credit card", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.id}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          me: {
            ...RegisterQueryResponseFixture.me,
            has_qualified_credit_cards: true,
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.id}/registration-flow`
      )
    })

    it("redirects back to the auction if the registration window has closed", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.id}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          sale: {
            ...RegisterQueryResponseFixture.sale,
            is_registration_closed: true,
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.id}`
      )
    })

    it("redirects to the auction confirm registration route if bidder has already registered", async () => {
      const { redirect } = await render(
        `/auction-registration/${RegisterQueryResponseFixture.sale.id}`,
        mockRegisterResolver({
          ...RegisterQueryResponseFixture,
          sale: {
            ...RegisterQueryResponseFixture.sale,
            registrationStatus: {
              qualified_for_bidding: true,
            },
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${RegisterQueryResponseFixture.sale.id}/confirm-registration`
      )
    })
  })
})
