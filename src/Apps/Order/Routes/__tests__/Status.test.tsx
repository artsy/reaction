import { Message } from "@artsy/palette"
import { mount, render } from "enzyme"
import React from "react"
import { HeadProvider } from "react-head"
import { Status_order } from "../../../../__generated__/Status_order.graphql"
import {
  OrderWithShippingDetails,
  PickupOrder,
} from "../../../../Apps/__test__/Fixtures/Order"
import { StatusRoute } from "../Status"

describe("Status", () => {
  const getWrapper = (order: Status_order, headTags = []) =>
    mount(
      <HeadProvider headTags={headTags}>
        <StatusRoute order={order} />
      </HeadProvider>
    )

  it("should should have a title containing status", async () => {
    const headTags = []
    getWrapper(OrderWithShippingDetails, headTags)
    // @ts-ignore
    expect(render(headTags).text()).toBe("Order status | Artsy")
  })

  describe("submitted", () => {
    it("should say order submitted and have message box", () => {
      const wrapper = getWrapper({
        ...OrderWithShippingDetails,
        state: "SUBMITTED",
      })
      expect(wrapper.text()).toContain("Your order has been submitted.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("approved", () => {
    it("should say confirmed", () => {
      const wrapper = getWrapper({
        ...OrderWithShippingDetails,
        state: "APPROVED",
      })
      expect(wrapper.text()).toContain("Your order is confirmed.")
    })
  })

  describe("fulfilled (ship)", () => {
    it("should say order has shipped and have message box", () => {
      const wrapper = getWrapper({
        ...OrderWithShippingDetails,
        state: "FULFILLED",
      })
      expect(wrapper.text()).toContain("Your order has shipped.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("fulfilled (pickup)", () => {
    it("should say order has been picked up and NOT have message box", () => {
      const wrapper = getWrapper({
        ...PickupOrder,
        state: "FULFILLED",
      })
      expect(wrapper.text()).toContain("Your order has been picked up.")
      expect(wrapper.find(Message).length).toBe(0)
    })
  })

  describe("canceled (ship)", () => {
    it("should say that order was canceled", () => {
      const wrapper = getWrapper({
        ...OrderWithShippingDetails,
        state: "CANCELED",
      })
      expect(wrapper.text()).toContain("Your order was canceled and refunded.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("canceled (pickup)", () => {
    it("should say that order was canceled", () => {
      const wrapper = getWrapper({
        ...PickupOrder,
        state: "CANCELED",
      })
      expect(wrapper.text()).toContain("Your order was canceled and refunded.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })
})
