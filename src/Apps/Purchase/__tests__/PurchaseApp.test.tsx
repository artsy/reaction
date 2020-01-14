import {
  PurchaseAppTestQueryRawResponse,
  PurchaseAppTestQueryResponse,
} from "__generated__/PurchaseAppTestQuery.graphql"
import { UntouchedBuyOrder } from "Apps/__tests__/Fixtures/Order"
import { SystemContextProvider } from "Artsy"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { PurchaseAppFragmentContainer } from "../PurchaseApp"

jest.unmock("react-relay")

const user = {
  type: "Admin",
}

const render = (orders: any) =>
  renderRelayTree({
    Component: (props: PurchaseAppTestQueryResponse) => (
      <PurchaseAppFragmentContainer
        orders={{
          ...orders,
        }}
        {...props}
      />
    ),
    mockData: {
      orders,
    } as PurchaseAppTestQueryRawResponse,
    query: graphql`
      query PurchaseAppTestQuery @raw_response_type {
        orders: commerceMyOrders(first: 20) {
          ...PurchaseApp_orders
        }
      }
    `,
    wrapper: children => (
      <SystemContextProvider user={user}>{children}</SystemContextProvider>
    ),
  })

describe("Purchase app", () => {
  it("renders", async () => {
    const component = await render({ edges: [{ node: UntouchedBuyOrder }] })
    console.log(component.debug())
    expect(component.find("Box").length).toBe(1)
  })
})
