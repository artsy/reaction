import { Button, Collapse } from "@artsy/palette"
import { OfferHistoryItem_order } from "__generated__/OfferHistoryItem_order.graphql"
import {
  Buyer,
  mockResolver,
  Offers,
  OfferWithTotals,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../OfferHistoryItem"

jest.unmock("react-relay")

const render = (
  extraOrderProps?: Partial<OfferHistoryItem_order>,
  extraComponentProps?: Partial<ExtractProps<typeof OfferHistoryItem>>
) =>
  renderRelayTree({
    Component: (props: any) => (
      <OfferHistoryItem {...extraComponentProps} {...props} />
    ),
    mockResolvers: mockResolver({
      ...UntouchedOfferOrder,
      buyer: Buyer,
      lastOffer: OfferWithTotals,
      ...extraOrderProps,
    }),
    query: graphql`
      query OfferHistoryItemTestQuery {
        order: ecommerceOrder(id: "foo") {
          ...OfferHistoryItem_order
        }
      }
    `,
  })

describe("OfferHistoryItem", () => {
  it("shows the current offer", async () => {
    const offerHistory = await render()

    const text = offerHistory.text()

    expect(text).toMatch("Seller's offer$14,000")
    expect(text).toMatch("List price: $16,000")
  })

  it("doesn't show the 'show offer history' button if no other offers", async () => {
    const offerHistory = await render()

    expect(offerHistory.find(Button)).toHaveLength(0)
  })

  it("does show the 'show offer history' button if there are other offers", async () => {
    const offerHistory = await render({ offers: { edges: Offers as any } })

    expect(offerHistory.find(Button)).toHaveLength(1)
  })

  it("shows the other offers if you click the button", async () => {
    const offerHistory = await render({ offers: { edges: Offers as any } })

    const button = offerHistory.find(Button)
    expect(button).toHaveLength(1)

    const collapse = offerHistory.find(Collapse)

    expect(collapse.props().open).toBeFalsy()

    button.simulate("click")

    expect(offerHistory.find(Collapse).props().open).toBeTruthy()

    const text = offerHistory.text()
    expect(text).toMatch("You (May 21)$1,200.00")
    expect(text).toMatch("Seller (Apr 30)$1,500.00")
    expect(text).toMatch("You (Apr 5)$1,100.00")
  })

  it("shows right copy if the last submitted offer was from the buyer", async () => {
    const offerHistory = await render({
      lastOffer: {
        ...OfferWithTotals,
        fromParticipant: "BUYER",
      } as any,
    })

    const text = offerHistory.text()

    expect(text).toMatch("Your offer$14,000")
  })
})
