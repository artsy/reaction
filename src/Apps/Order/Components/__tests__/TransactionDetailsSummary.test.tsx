import {
  mockResolver,
  OfferOrderWithOffers,
  OfferWithTotals,
  UntouchedBuyOrder,
} from "Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { TransactionDetailsSummaryItemFragmentContainer } from "../TransactionDetailsSummaryItem"

jest.unmock("react-relay")

const transactionSummaryBuyOrder = {
  ...UntouchedBuyOrder,
  shippingTotal: "$12.00",
  shippingTotalCents: "1200",
  taxTotal: "$3.25",
  taxTotalCents: "325",
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const transactionSummaryOfferOrder = {
  ...OfferOrderWithOffers,
  shippingTotal: "$12.00",
  shippingTotalCents: "1200",
  taxTotal: "$3.25",
  taxTotalCents: "325",
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const render = (
  order,
  extraProps?: Partial<
    ExtractProps<typeof TransactionDetailsSummaryItemFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: any) => (
      <TransactionDetailsSummaryItemFragmentContainer
        {...props}
        {...extraProps}
      />
    ),
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
  describe("BuyOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryBuyOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("Price$200.00")
      expect(text).toMatch("Shipping$12.00")
      expect(text).toMatch("Tax$3.25")
      expect(text).toMatch("Total$215.25")
    })

    it("shows the shipping and tax price as dashes if null", async () => {
      const transactionSummary = await render({
        ...transactionSummaryBuyOrder,
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
        ...transactionSummaryBuyOrder,
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

  describe("OfferOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryOfferOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$14,000")
      expect(text).toMatch("Shipping$200")
      expect(text).toMatch("Tax$120")
      expect(text).toMatch("Total$14,320")
    })

    it("shows the shipping and tax price as dashes if null", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
        myLastOffer: {
          ...OfferWithTotals,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
          buyerTotal: null,
          buyerTotalCents: null,
          fromParticipant: "BUYER",
        },
      })

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$14,000")
      expect(text).toMatch("Shipping—")
      expect(text).toMatch("Tax—")
      expect(text).toMatch("Total")
    })

    it("shows the shipping and tax price as $0.00 if zero cents", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
        myLastOffer: {
          ...OfferWithTotals,
          taxTotal: null,
          taxTotalCents: 0,
          shippingTotal: null,
          shippingTotalCents: 0,
          buyerTotal: "$14,000",
          buyerTotalCents: 1400000,
          fromParticipant: "BUYER",
        },
      } as any)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$14,000")
      expect(text).toMatch("Shipping$0.00")
      expect(text).toMatch("Tax$0.00")
      expect(text).toMatch("Total$14,000")
    })

    it("shows empty fields when there are no myLastOffer yet", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
        myLastOffer: null,
      } as any)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer—")
      expect(text).toMatch("Shipping—")
      expect(text).toMatch("Tax—")
      expect(text).toMatch("Total")
    })

    it("shows the last submitted offer if requested", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            id: "last-offer",
            amount: "£poundz",
            fromParticipant: "SELLER",
          },
          myLastOffer: {
            ...OfferWithTotals,
            id: "my-last-offer",
            amount: "$dollaz",
            fromParticipant: "BUYER",
          },
        },
        { useLastSubmittedOffer: true }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Seller's offer£poundz")
    })

    it("says 'seller's offer' when the last submitted offer is from the seller", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        },
        { useLastSubmittedOffer: true }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Seller's offer£405.00")
    })

    it("takes an offer override parameter", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        },
        { useLastSubmittedOffer: true, offerOverride: "$1billion" }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$1billion")
    })

    it("lets you specify whether to use list price or last offer as context price", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            amount: "£405.00",
            id: "last-offer",
            fromParticipant: "SELLER",
          },
          myLastOffer: {
            ...OfferWithTotals,
            id: "my-last-offer",
            amount: "£400.00",
            fromParticipant: "BUYER",
          },
        },
        { offerContextPrice: "LAST_OFFER" }
      )

      const text = transactionSummary.text()

      expect(text).toContain("Your offer£400.00Seller's offer£405.00")
    })
  })
})
