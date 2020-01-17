import {
  PurchaseAppTestQueryRawResponse,
  PurchaseAppTestQueryResponse,
} from "__generated__/PurchaseAppTestQuery.graphql"
import { UntouchedBuyOrder } from "Apps/__tests__/Fixtures/Order"
import { SystemContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { PurchaseAppFragmentContainer } from "../PurchaseApp"

jest.unmock("react-relay")

const render = (
  orders: PurchaseAppTestQueryRawResponse["orders"],
  user: User
) =>
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
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider user={user}>{children}</SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    ),
  })

describe("Purchase app", () => {
  describe("User with admin privilages", () => {
    it("renders orders with view details button", async () => {
      // TODO: revisit mocking and remove `artist_names` alias from PurchseHistory
      const mockOrderEdges = { edges: [{ node: UntouchedBuyOrder }] }
      const component = await render(mockOrderEdges, { type: "Admin" })
      const text = component.text()
      expect(text).toContain(
        "PurchasesLisa BreslowGramercy Park South, 2016buypending"
      )
      const btn = component.find("Button")
      expect(btn.length).toBe(1)
      expect(btn.text()).toEqual("View details")
    })
  })
  describe("User without admin privilages", () => {
    it("gives error", async () => {
      const mockOrderEdges = { edges: [{ node: UntouchedBuyOrder }] }
      const component = await render(mockOrderEdges, { type: "regular-user" })
      const text = component.text()
      expect(text).not.toContain(
        "PurchasesLisa BreslowGramercy Park South, 2016buypending"
      )
      expect(text).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })
})
