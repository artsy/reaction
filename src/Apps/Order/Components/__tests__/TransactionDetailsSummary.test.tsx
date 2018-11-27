import { mockResolver, UntouchedBuyOrder } from "Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "DevTools"
import { graphql } from "react-relay"
import { TransactionDetailsSummaryItemFragmentContainer } from "../TransactionDetailsSummaryItem"

jest.unmock("react-relay")

const transactionSummaryOrder = {
  ...UntouchedBuyOrder,
  shippingTotal: "$12.00",
  shippingTotalCents: "1200",
  taxTotal: "$3.25",
  taxTotalCents: "325",
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const render = order =>
  renderRelayTree({
    Component: TransactionDetailsSummaryItemFragmentContainer,
    mockResolvers: mockResolver({
      ...order,
    }),
    query: graphql`
      query TransactionDetailsSummaryItemTestQuery {
        order: ecommerceOrder(id: "whatevs") {
          ...TransactionDetailsSummaryItem_order
        }
      }
    `,
  })

describe("TransactionDetailsSummaryItem", () => {
  it("shows the shipping and tax price if it's greater than 0", async () => {
    const transactionSummary = await render(transactionSummaryOrder)

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping$12.00")
    expect(text).toMatch("Tax$3.25")
    expect(text).toMatch("Total$215.25")
  })

  it("shows the shipping and tax price as dashes if null", async () => {
    const transactionSummary = await render({
      ...transactionSummaryOrder,
      taxTotal: null,
      taxTotalCents: null,
      shippingTotal: null,
      shippingTotalCents: null,
    })

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping—")
    expect(text).toMatch("Tax—")
    expect(text).toMatch("Total$215.25")
  })

  it("shows the shipping and tax price as $0.00 if zero cents", async () => {
    const transactionSummary = await render({
      ...transactionSummaryOrder,
      taxTotal: null,
      taxTotalCents: 0,
      shippingTotal: null,
      shippingTotalCents: 0,
    } as any)

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping$0.00")
    expect(text).toMatch("Tax$0.00")
    expect(text).toMatch("Total$215.25")
  })
})
