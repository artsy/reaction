import { IdentityVerificationPageQueryResponseFixture } from "Apps/IdentityVerification/__fixtures__/routes_IdentitifcationPageQuery"
import { createMockNetworkLayer2 } from "DevTools"
import { Resolver } from "found-relay"
import {
  FarceElementResult,
  FarceRedirectResult,
  getFarceResult,
} from "found/lib/server"
import { Environment, RecordSource, Store } from "relay-runtime"

import { routes } from "Apps/IdentityVerification/routes"

import { routes_IdentityVerificationPageQueryRawResponse } from "__generated__/routes_IdentityVerificationPageQuery.graphql"
import { createRender } from "found"

describe("IdentityVerification/routes", () => {
  const idvID = (IdentityVerificationPageQueryResponseFixture.me as any)
    .identityVerification.internalID
  async function render(
    url,
    mockData: routes_IdentityVerificationPageQueryRawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return (await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: createRender({}),
    })) as Partial<FarceRedirectResult & FarceElementResult>
  }

  it("renders the Identity Verification landing page", async () => {
    const { status } = await render(
      `/identity-verification/${idvID}`,
      IdentityVerificationPageQueryResponseFixture
    )
    expect(status).toBe(200)
  })
})
