import { routes } from "Apps/Auction/routes"
import { createMockNetworkLayer2 } from "DevTools"
import { createRender } from "found"
import { Resolver } from "found-relay"
import getFarceResult from "found/lib/server/getFarceResult"
import { Environment, RecordSource, Store } from "relay-runtime"
import {
  RegisterQueryResponse,
  RegisterQueryResponseFixture as Fixture,
} from "../../__tests__/Fixtures/Auction/Routes/Register"

describe("Auction/redirects", () => {
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

  const mockResolver = (
    data: RegisterQueryResponse
  ): RegisterQueryResponse => ({
    sale: data.sale,
    me: data.me,
  })

  it("does not redirect if a sale is found", async () => {
    const { redirect } = await render(
      `/auction-registration2/${Fixture.sale.id}`,
      mockResolver(Fixture)
    )

    expect(redirect).toBeUndefined
  })

  it("redirects to the auction registration modal if the user has a qualified credit card", async () => {
    const { redirect } = await render(
      `/auction-registration2/${Fixture.sale.id}`,
      mockResolver({
        ...Fixture,
        me: {
          ...Fixture.me,
          has_qualified_credit_cards: true,
        },
      })
    )

    expect(redirect.url).toBe(`/auction/${Fixture.sale.id}/registration-flow`)
  })

  it("redirects back to the auction if the registration window has closed", async () => {
    const { redirect } = await render(
      `/auction-registration2/${Fixture.sale.id}`,
      mockResolver({
        ...Fixture,
        sale: {
          ...Fixture.sale,
          is_registration_closed: true,
        },
      })
    )

    expect(redirect.url).toBe(`/auction/${Fixture.sale.id}`)
  })

  it("redirects to the auction confirm registration route if bidder has already registered", async () => {
    const { redirect } = await render(
      `/auction-registration2/${Fixture.sale.id}`,
      mockResolver({
        ...Fixture,
        sale: {
          ...Fixture.sale,
          registrationStatus: {
            qualified_for_bidding: true,
          },
        },
      })
    )

    expect(redirect.url).toBe(
      `/auction/${Fixture.sale.id}/confirm-registration`
    )
  })
})
