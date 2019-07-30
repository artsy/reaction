import { routes } from "Apps/Auction/routes"
import { createMockNetworkLayer2 } from "DevTools"
import { createRender } from "found"
import { Resolver } from "found-relay"
import getFarceResult from "found/lib/server/getFarceResult"
import { Environment, RecordSource, Store } from "relay-runtime"
import { SaleAuction } from "../../__tests__/Fixtures/Sale"

describe("AuctionApp", () => {
  describe("redirects", () => {
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

    const mockResolver = data => ({ sale: data, me: { name: "Emmett Brown" } })

    it("does not redirect if a sale is found", async () => {
      const { redirect } = await render(
        `/auction-registration2/${SaleAuction.id}`,
        mockResolver(SaleAuction)
      )

      expect(redirect).toBeUndefined
    })

    it("redirects back to the auction if the registration window has closed", async () => {
      const { redirect } = await render(
        `/auction-registration2/${SaleAuction.id}`,
        mockResolver({
          ...SaleAuction,
          is_registration_closed: true,
        })
      )

      expect(redirect.url).toBe(`/auction/${SaleAuction.id}`)
    })

    it("redirects to the auction confirm registration route if bidder has already registered", async () => {
      const { redirect } = await render(
        `/auction-registration2/${SaleAuction.id}`,
        mockResolver({
          ...SaleAuction,
          registrationStatus: {
            qualified_for_bidding: true,
          },
        })
      )

      expect(redirect.url).toBe(
        `/auction/${SaleAuction.id}/confirm-registration`
      )
    })
  })
})
