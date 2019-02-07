import { Message } from "@artsy/palette"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "Apps/__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne } from "DevTools/RootTestPage"
import { render } from "enzyme"
import { produce } from "immer"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "../Status"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

class StatusTestPage extends OrderAppTestPage {
  get messageText() {
    return expectOne(this.find(Message)).text()
  }
  expectMessage() {
    expect(this.find(Message).length).toBe(1)
  }
  expectNoMessage() {
    expect(this.find(Message).length).toBe(0)
  }
}

const testOrder = {
  ...OfferOrderWithShippingDetailsAndNote,
  state: "SUBMITTED",
}

describe("Status", () => {
  const env = createTestEnv({
    Component: StatusFragmentContainer,
    query: graphql`
      query StatusQuery {
        order(id: "42") {
          ...Status_order
        }
      }
    `,
    defaultData: {
      order: testOrder,
    },
    TestPage: StatusTestPage,
  })

  function buildPageWithOrder<Order>(order: Order) {
    return env.buildPage({
      mockData: {
        order,
      },
    })
  }

  describe("offers", () => {
    it("should should have a title containing status", async () => {
      expect(env.headTags.length).toEqual(0)
      await env.buildPage()
      expect(env.headTags.length).toEqual(1)
      expect(render(env.headTags[0]).text()).toBe("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const page = await env.buildPage()
        expect(page.text()).toContain("Your offer has been submitted")
        page.expectMessage()
      })

      it("should not warn the user about having the artwork bought while artwork is not available for buy now", async () => {
        const page = await buildPageWithOrder(
          produce(testOrder, order => {
            order.lineItems.edges[0].node.artwork.is_acquireable = false
          })
        )
        expect(page.text()).not.toContain("or buy now at list price")
        page.expectMessage()
      })

      it("should show a note section", async () => {
        const page = await env.buildPage()
        expect(page.text()).toContain("Your noteAnother note!")
        page.expectMessage()
      })

      it("should not show a note section if none exists", async () => {
        const page = await buildPageWithOrder(
          produce(testOrder, order => {
            order.lastOffer.note = null
          })
        )
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(page.text()).toContain("Offer accepted")
        page.expectMessage()
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        page.expectMessage()
      })

      it("should not contain a note section", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(page.text()).not.toContain("Your note")
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        page.expectNoMessage()
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "buyer_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        page.expectMessage()
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "seller_rejected",
        })
        expect(page.text()).toContain("Offer declined")
        page.expectMessage()
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "seller_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        page.expectMessage()
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "buyer_lapsed",
        })
        expect(page.text()).toContain("offer expired")
        page.expectMessage()
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("canceled after accpet", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: null,
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
        expect(page.find(TransactionDetailsSummaryItem).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      expect(env.headTags.length).toEqual(0)
      await env.buildPage({ mockData: { order: BuyOrderWithShippingDetails } })
      expect(env.headTags.length).toEqual(1)
      expect(render(env.headTags[0]).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          state: "SUBMITTED",
        })
        expect(page.text()).toContain("Your order has been submitted")
        page.expectMessage()
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(page.text()).toContain("Your order is confirmed")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has shipped")
        page.expectMessage()
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          state: "FULFILLED",
        })
        expect(page.text()).toContain("Your order has been picked up")
        expect(page.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderWithShippingDetails,
          state: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          state: "CANCELED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const page = await buildPageWithOrder({
          ...BuyOrderPickup,
          state: "REFUNDED",
        })
        expect(page.text()).toContain("Your order was canceled and refunded")
        page.expectMessage()
      })
    })
  })

  it("tracks a pageview", async () => {
    await env.buildPage()

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
