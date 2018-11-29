import { Message } from "@artsy/palette"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  mockResolver,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { ContextProvider } from "Artsy"
import { MockBoot, renderRelayTree } from "DevTools"
import { render } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "../Status"

jest.unmock("react-relay")

describe("Status", () => {
  const getWrapper = (order: any, headTags: JSX.Element[] = []) => {
    return renderRelayTree({
      Component: StatusFragmentContainer,
      query: graphql`
        query StatusQuery {
          order(id: "42") {
            ...Status_order
          }
        }
      `,
      mockResolvers: mockResolver(order),
      wrapper: renderer => (
        <MockBoot breakpoint="xs" headTags={headTags}>
          <ContextProvider mediator={{ trigger: jest.fn() }}>
            {renderer}
          </ContextProvider>
        </MockBoot>
      ),
    })
  }

  describe("offers", () => {
    it("should should have a title containing status", async () => {
      const headTags: JSX.Element[] = []
      await getWrapper(OfferOrderWithShippingDetails, headTags)
      expect(headTags.length).toEqual(1)
      expect(render(headTags[0]).text()).toBe("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).toContain("Your order has been submitted.")
        expect(wrapper.find(Message).length).toBe(1)
      })

      it("should not warn the user about having the artwork bought while artwork is not available for buy now", async () => {
        const order = OfferOrderWithShippingDetails
        order.lineItems.edges[0].node.artwork.is_acquireable = false
        const wrapper = await getWrapper({
          ...order,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).not.toContain("or buy now at list price.")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(wrapper.text()).toContain("Your order is confirmed.")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has shipped.")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has been picked up.")
        expect(wrapper.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain(
          "Your order was canceled and refunded."
        )
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain(
          "Your order was canceled and refunded."
        )
        expect(wrapper.find(Message).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      const headTags: JSX.Element[] = []
      await getWrapper(BuyOrderWithShippingDetails, headTags)
      expect(headTags.length).toEqual(1)
      expect(render(headTags[0]).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).toContain("Your order has been submitted.")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(wrapper.text()).toContain("Your order is confirmed.")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has shipped.")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderPickup,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has been picked up.")
        expect(wrapper.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain(
          "Your order was canceled and refunded."
        )
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderPickup,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain(
          "Your order was canceled and refunded."
        )
        expect(wrapper.find(Message).length).toBe(1)
      })
    })
  })
})
