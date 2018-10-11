import { Message } from "@artsy/palette"
import { render } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import {
  mockResolver,
  OrderWithShippingDetails,
  PickupOrder,
} from "../../../../Apps/__test__/Fixtures/Order"
import { MockBoot, renderRelayTree } from "../../../../DevTools"
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
          {renderer}
        </MockBoot>
      ),
    })
  }

  it("should should have a title containing status", async () => {
    const headTags: JSX.Element[] = []
    await getWrapper(OrderWithShippingDetails, headTags)
    expect(headTags.length).toEqual(1)
    expect(render(headTags[0]).text()).toBe("Order status | Artsy")
  })

  describe("submitted", () => {
    it("should say order submitted and have message box", async () => {
      const wrapper = await getWrapper({
        ...OrderWithShippingDetails,
        state: "SUBMITTED",
      })
      expect(wrapper.text()).toContain("Your order has been submitted.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("approved", () => {
    it("should say confirmed", async () => {
      const wrapper = await getWrapper({
        ...OrderWithShippingDetails,
        state: "APPROVED",
      })
      expect(wrapper.text()).toContain("Your order is confirmed.")
    })
  })

  describe("fulfilled (ship)", () => {
    it("should say order has shipped and have message box", async () => {
      const wrapper = await getWrapper({
        ...OrderWithShippingDetails,
        state: "FULFILLED",
      })
      expect(wrapper.text()).toContain("Your order has shipped.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("fulfilled (pickup)", () => {
    it("should say order has been picked up and NOT have message box", async () => {
      const wrapper = await getWrapper({
        ...PickupOrder,
        state: "FULFILLED",
      })
      expect(wrapper.text()).toContain("Your order has been picked up.")
      expect(wrapper.find(Message).length).toBe(0)
    })
  })

  describe("canceled (ship)", () => {
    it("should say that order was canceled", async () => {
      const wrapper = await getWrapper({
        ...OrderWithShippingDetails,
        state: "CANCELED",
      })
      expect(wrapper.text()).toContain("Your order was canceled and refunded.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })

  describe("canceled (pickup)", () => {
    it("should say that order was canceled", async () => {
      const wrapper = await getWrapper({
        ...PickupOrder,
        state: "CANCELED",
      })
      expect(wrapper.text()).toContain("Your order was canceled and refunded.")
      expect(wrapper.find(Message).length).toBe(1)
    })
  })
})
