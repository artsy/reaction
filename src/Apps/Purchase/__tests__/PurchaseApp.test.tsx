import {
  PurchaseAppTestQueryRawResponse,
  PurchaseAppTestQueryResponse,
} from "__generated__/PurchaseAppTestQuery.graphql"
import { SystemContextProvider } from "Artsy"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { PurchaseAppFragmentContainer } from "../PurchaseApp"

jest.unmock("react-relay")

const render = (
  orders: any,
  extraProps?: Partial<ExtractProps<typeof PurchaseAppFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: PurchaseAppTestQueryResponse) => (
      <PurchaseAppFragmentContainer
        orders={{
          ...orders,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      orders,
    } as PurchaseAppTestQueryRawResponse,
    query: graphql`
      query PurchaseAppTestQuery @raw_response_type {
        orders(first: 20) {
          ...PurchaseApp_orders
        }
      }
    `,
  })

describe("Purchase app", () => {
  // it("resolves with a 404 status if url does not match request", async () => {
  //   const { status } = await getWrapper({ url: "/bad-url" })
  //   expect(status).toEqual(404)
  // })
})
