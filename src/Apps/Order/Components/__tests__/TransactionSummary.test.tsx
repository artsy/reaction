import { render } from "enzyme"
import React from "react"
import { TransactionSummary } from "../TransactionSummary"

describe("TransactionSummary", () => {
  it("shows the shipping and tax price if it's greater than 0", () => {
    const transactionSummary = render(
      <TransactionSummary order={transactionSummaryOrder} />
    )

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping$12.00")
    expect(text).toMatch("Tax$3.25")
    expect(text).toMatch("Total$215.25")
  })

  it("shows the shipping and tax price as dashes if null", () => {
    const transactionSummary = render(
      <TransactionSummary
        order={{
          ...transactionSummaryOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        }}
      />
    )

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping—")
    expect(text).toMatch("Tax—")
    expect(text).toMatch("Total$215.25")
  })

  it("shows the shipping and tax price as $0.00 if zero cents", () => {
    const transactionSummary = render(
      <TransactionSummary
        order={{
          ...transactionSummaryOrder,
          taxTotal: null,
          taxTotalCents: 0,
          shippingTotal: null,
          shippingTotalCents: 0,
        }}
      />
    )

    const text = transactionSummary.text()

    expect(text).toMatch("Price$200.00")
    expect(text).toMatch("Shipping$0.00")
    expect(text).toMatch("Tax$0.00")
    expect(text).toMatch("Total$215.25")
  })
})

const transactionSummaryOrder = {
  shippingTotal: "$12.00",
  shippingTotalCents: "1200",
  taxTotal: "$3.25",
  taxTotalCents: "325",
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
  seller: { name: "Gagosian Gallery" },
  lineItems: {
    edges: [
      {
        node: {
          artwork: {
            artist_names: "Andy Warhol and Friends",
            title: "My Artwork",
            date: "2001",
            shippingOrigin: "NY, NY",
            image: {
              resized_transactionSummary: { url: "https://blah.jpg" },
            },
          },
        },
      },
    ],
  },
}
